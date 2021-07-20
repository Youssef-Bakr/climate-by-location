import View from "./view_base.js";
import {max, mean, min, round} from "../../node_modules/lodash-es/lodash.js";
import {format_export_data, rgba} from "../utils.js";
import {monthly_timeperiods, months, months_labels} from "../constants.js";
import {get_historical_observed_livneh_data, get_projected_loca_model_data} from "../io.js";

/* globals jQuery, window, Plotly, fetch, jStat */
// noinspection DuplicatedCode
export default class ConusMonthView extends View {
  async request_update() {
    const {
      colors,
      monthly_timeperiod,
      plotly_layout_defaults,
      show_historical_observed,
      show_legend,
      show_projected_rcp45,
      show_projected_rcp85,
      variable,
    } = this.parent.options;
    const area = this.parent.get_area();
    const variable_config = this.parent.get_variable_config();
    const _options = Object.assign({area, variable_config}, this.parent.options)
    const [hist_obs_month_values, proj_mod_month_values] = await Promise.all([
      get_historical_observed_livneh_data(_options),
      get_projected_loca_model_data(_options)
    ])
    const hist_obs_sdate_year = hist_obs_month_values['01'][0][0];
    const hist_obs_edate_year = hist_obs_month_values['01'][hist_obs_month_values['01'].length - 1][0];
    let hist_obs_data = [];
    for (const month of months) {
      hist_obs_data.push([month, mean(hist_obs_month_values[month].map(a => a[1]))]);
    }

    // reshape from {month: [year, rcp45_mean, rcp45_min, rcp45_max, rcp85_mean, rcp85_min, rcp85_max]} to ['month', '2025_rcp45_mean', '2025_rcp45_min', '2025_rcp45_max', '2025_rcp85_mean', '2025_rcp85_min', '2025_rcp85_max', '2050_rcp45_mean', '2050_rcp45_min', '2050_rcp45_max', '2050_rcp85_mean', '2050_rcp85_min', '2050_rcp85_max', '2075_rcp45_mean', '2075_rcp45_min', '2075_rcp45_max', '2075_rcp85_mean', '2075_rcp85_min', '2075_rcp85_max']
    const proj_sdate_year = proj_mod_month_values['01'][0][0];
    // const proj_edate_year = proj_mod_month_values['01'][proj_mod_month_values['01'].length - 1][0];
    let proj_mod_data = [];
    for (const month of months) {
      let _month_data = [];
      for (const year_range of monthly_timeperiods) {
        let year_range_min_idx = year_range - 15 - proj_sdate_year;
        for (const scenario_column_offset of [0, 3]) { // rcp45, rcp85
          for (const value_i of [0, 1, 2]) { //mean, min, max
            _month_data.push(mean(proj_mod_month_values[month].slice(year_range_min_idx, year_range_min_idx + 30).map(a => a[1 + scenario_column_offset + value_i])))
          }
        }
      }
      proj_mod_data.push([month, ..._month_data]);
    }
    const precision = variable_config.rounding_precision || 1;
    const d3_precision = precision > 0 ? precision : 0; // d3 format can't round to 10s, 100s, etc
    this._download_callbacks = {
      hist_obs: async () => format_export_data(['month', 'mean', `* Note that the mean is based on monthly data for years  ${hist_obs_sdate_year}-${hist_obs_edate_year}`], hist_obs_data, null, precision),
      proj_mod: async () => format_export_data(['month', '2025_rcp45_mean', '2025_rcp45_min', '2025_rcp45_max', '2025_rcp85_mean', '2025_rcp85_min', '2025_rcp85_max', '2050_rcp45_mean', '2050_rcp45_min', '2050_rcp45_max', '2050_rcp85_mean', '2050_rcp85_min', '2050_rcp85_max', '2075_rcp45_mean', '2075_rcp45_min', '2075_rcp45_max', '2075_rcp85_mean', '2075_rcp85_min', '2075_rcp85_max'], proj_mod_data, null, precision)
    };


    const chart_data = {
      'month': [],
      'month_label': [],
      'hist_obs': [],
      'rcp45_mean': [],
      'rcp45_min': [],
      'rcp45_max': [],
      'rcp85_mean': [],
      'rcp85_min': [],
      'rcp85_max': []
    };

    const _monthly_timeperiod = Number.parseInt(monthly_timeperiod);
    const col_offset = 1 + (monthly_timeperiods.indexOf(_monthly_timeperiod) * 6)
    // for some reason unknown to me, the following month cycle is shown.
    const month_indexes = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const proj_mod_customdata = []
    for (const m of month_indexes) {
      const _m = m % 12;
      chart_data['month'].push(m);
      chart_data['month_label'].push(months_labels[_m]);
      chart_data['hist_obs'].push(round(hist_obs_data[_m][1], precision));
      chart_data['rcp45_mean'].push(round(proj_mod_data[_m][col_offset], precision));
      chart_data['rcp45_min'].push(round(proj_mod_data[_m][1 + col_offset], precision));
      chart_data['rcp45_max'].push(round(proj_mod_data[_m][2 + col_offset], precision));
      chart_data['rcp85_mean'].push(round(proj_mod_data[_m][3 + col_offset], precision));
      chart_data['rcp85_min'].push(round(proj_mod_data[_m][4 + col_offset], precision));
      chart_data['rcp85_max'].push(round(proj_mod_data[_m][5 + col_offset], precision));
      const l = chart_data['rcp45_mean'].length - 1;
      proj_mod_customdata.push([chart_data['month'][l], chart_data['rcp45_mean'][l], chart_data['rcp45_min'][l], chart_data['rcp45_max'][l], chart_data['rcp85_mean'][l], chart_data['rcp85_min'][l], chart_data['rcp85_max'][l]])
    }

    const [x_range_min, x_range_max, y_range_min, y_range_max] = this.parent._update_axes_ranges(
      month_indexes,
      month_indexes[month_indexes.length - 1],
      min([min(chart_data['hist_obs']), min(chart_data['rcp45_min']), min(chart_data['rcp85_min'])]),
      max([max(chart_data['hist_obs']), max(chart_data['rcp45_max']), max(chart_data['rcp85_max'])]),
    );
    Plotly.react(
      this.element,
      [
        {
          x: chart_data['month'],
          y: chart_data['rcp45_min'],
          name: 'Modeled minimum (RCP 4.5 projection)',
          type: 'scatter',
          mode: 'lines',
          fill: 'none',
          fillcolor: rgba(colors.rcp45.outerBand, colors.opacity.ann_proj_minmax),
          line: {
            color: rgba(colors.rcp45.outerBand, colors.opacity.ann_proj_minmax),
            width: 0,
            opacity: colors.opacity.ann_proj_minmax
          },
          legendgroup: 'rcp45',
          visible: show_projected_rcp45 ? true : 'legendonly',
          hoverinfo: 'skip'
        },
        {
          x: chart_data['month'],
          y: chart_data['rcp45_max'],
          name: 'Modeled maximum (RCP 4.5 projection)',
          fill: 'tonexty',
          type: 'scatter',
          mode: 'lines',
          fillcolor: rgba(colors.rcp45.outerBand, colors.opacity.ann_proj_minmax),
          line: {
            color: rgba(colors.rcp45.outerBand, colors.opacity.ann_proj_minmax),
            width: 0,
            opacity: colors.opacity.ann_proj_minmax
          },
          legendgroup: 'rcp45',
          visible: show_projected_rcp45 ? true : 'legendonly',
          hoverlabel: {namelength: 0},
          customdata: proj_mod_customdata,
          hovertemplate: `(range: %{customdata[2]:.${d3_precision}f}&#8211;%{customdata[3]:.${d3_precision}f})`
        },
        {
          x: chart_data['month'],
          y: chart_data['rcp85_min'],
          name: 'Modeled minimum (RCP 8.5 projection)',
          type: 'scatter',
          mode: 'lines',
          fill: 'none',
          fillcolor: rgba(colors.rcp85.outerBand, colors.opacity.ann_proj_minmax),
          line: {
            color: rgba(colors.rcp85.outerBand, colors.opacity.ann_proj_minmax),
            width: 0,
            opacity: colors.opacity.ann_proj_minmax
          },
          legendgroup: 'rcp85',
          visible: show_projected_rcp85 ? true : 'legendonly',
          showlegend: false,
          hoverinfo: 'skip'
        },
        {
          x: chart_data['month'],
          y: chart_data['rcp85_max'],
          name: 'Modeled maximum (RCP 8.5 projection)',
          fill: 'tonexty',
          type: 'scatter',
          mode: 'lines',
          fillcolor: rgba(colors.rcp85.outerBand, colors.opacity.ann_proj_minmax),
          line: {
            color: rgba(colors.rcp85.outerBand, colors.opacity.ann_proj_minmax),
            width: 0,
            opacity: colors.opacity.ann_proj_minmax
          },
          legendgroup: 'rcp85',
          visible: show_projected_rcp85 ? true : 'legendonly',
          hoverlabel: {namelength: 0},
          customdata: proj_mod_customdata,
          hovertemplate: `(range: %{customdata[5]:.${d3_precision}f}&#8211;%{customdata[6]:.${d3_precision}f})`
        },
        {
          x: chart_data['month'],
          y: chart_data['hist_obs'],
          type: 'scatter',
          mode: 'lines',
          name: `${hist_obs_sdate_year}-${hist_obs_edate_year} observed average`,
          line: {color: colors.hist.line},
          legendgroup: 'histobs',
          visible: !!show_historical_observed ? true : 'legendonly',
          hovertemplate: `${hist_obs_sdate_year}-${hist_obs_edate_year} observed average: <b>%{y:.${d3_precision}f}</b>`,
          hoverlabel: {namelength: 0},
        },
        {
          x: chart_data['month'],
          y: chart_data['rcp45_mean'],
          type: 'scatter',
          mode: 'lines',
          name: 'Modeled mean (RCP 4.5 projection)',
          line: {color: rgba(colors.rcp45.line, colors.opacity.proj_line)},
          visible: show_projected_rcp45 ? true : 'legendonly',
          legendgroup: 'rcp45',
          hoverlabel: {namelength: 0},
          hovertemplate: `lower emissions average projection: <b>%{y:.${d3_precision}f}</b>`
        },
        {
          x: chart_data['month'],
          y: chart_data['rcp85_mean'],
          type: 'scatter',
          mode: 'lines',
          name: 'Modeled mean (RCP 8.5 projection)',
          visible: show_projected_rcp85 ? true : 'legendonly',
          line: {color: rgba(colors.rcp85.line, colors.opacity.proj_line)},
          legendgroup: 'rcp85',
          hoverlabel: {namelength: 0},
          hovertemplate: `higher emissions average projection: <b>%{y:.${d3_precision}f}</b>`

        }
      ],
      // layout
      Object.assign({}, plotly_layout_defaults,
        {
          showlegend: show_legend,
          xaxis: Object.assign(this.parent._get_x_axis_layout(x_range_min, x_range_max), {tickmode: 'array', tickvals: month_indexes, ticktext: chart_data['month_label']}),
          yaxis: this.parent._get_y_axis_layout(y_range_min, y_range_max, variable_config)
        }
      ),
      // options
      this.parent._get_plotly_options(),
    );

    this._when_chart = new Promise((resolve) => {
      this.element.once('plotly_afterplot', (gd) => {
        resolve(gd)
      })
    });
    await this._when_chart
    this.parent._hide_spinner()

  }

  async request_style_update() {
    const {show_projected_rcp45, show_projected_rcp85, show_historical_observed} = this.parent.options;
    Plotly.restyle(this.element, {
      visible: [
        !!show_projected_rcp45 ? true : 'legendonly',
        !!show_projected_rcp45 ? true : 'legendonly',
        !!show_projected_rcp85 ? true : 'legendonly',
        !!show_projected_rcp85 ? true : 'legendonly',
        !!show_historical_observed ? true : 'legendonly',
        !!show_projected_rcp45 ? true : 'legendonly',
        !!show_projected_rcp85 ? true : 'legendonly']
    })
  }

  async request_downloads() {
    const {get_area_label, frequency, variable} = this.parent.options
    return [
      {
        label: 'Observed Data',
        icon: 'bar-chart',
        attribution: 'ACIS: livneh',
        when_data: this._download_callbacks['hist_obs'],
        filename: [
          get_area_label.bind(this)(),
          frequency,
          "hist_obs",
          variable
        ].join('-').replace(/ /g, '_') + '.csv'
      },
      {
        label: 'Projected Modeled Data',
        icon: 'area-chart',
        attribution: 'ACIS: LOCA (CMIP 5)',
        when_data: this._download_callbacks['proj_mod'],
        filename: [
          get_area_label.bind(this)(),
          frequency,
          "proj_mod",
          variable
        ].join('-').replace(/ /g, '_') + '.csv'
      },
      {
        label: 'Chart image',
        icon: 'picture-o',
        attribution: 'ACIS: Livneh & LOCA (CMIP 5)',
        when_data: async () => {
          let {width, height} = window.getComputedStyle(this.element);
          width = Number.parseFloat(width) * 1.2;
          height = Number.parseFloat(height) * 1.2;
          return await Plotly.toImage(this.element, {
            format: 'png', width: width, height: height
          });
        },
        filename: [
          get_area_label.bind(this)(),
          frequency,
          variable,
          "graph"
        ].join('-').replace(/[^A-Za-z0-9\-]/g, '_') + '.png'
      },
    ]
  }
}