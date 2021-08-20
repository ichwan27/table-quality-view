import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import React, { Component } from 'react';

am4core.useTheme(am4themes_animated);

class ChartModul extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.PieChart);

    chart.paddingRight = this.props.paddingRight;

    chart.data = [{
      "country": "Lithuania",
      "litres": 501.9
    }, {
      "country": "Czech Republic",
      "litres": 301.9
    }, {
      "country": "Ireland",
      "litres": 201.1
    }, {
      "country": "Germany",
      "litres": 165.8
    }, {
      "country": "Australia",
      "litres": 139.9
    }, {
      "country": "Austria",
      "litres": 128.3
    }, {
      "country": "UK",
      "litres": 99
    }, {
      "country": "Belgium",
      "litres": 60
    }, {
      "country": "The Netherlands",
      "litres": 50
    }];

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.slices.template.draggable = true;
    pieSeries.slices.template.cornerRadius = 3;
    pieSeries.slices.template.innerCornerRadius = 9;
    pieSeries.slices.template.marginRight=10;

    chart.radius = am4core.percent(80);
    chart.innerRadius = am4core.percent(50);

    chart.legend = new am4charts.Legend();

    this.chart = chart;
  }

  componentDidUpdate(oldProps) {
    if (oldProps.paddingRight !== this.props.paddingRight) {
      this.chart.paddingRight = this.props.paddingRight;
    }
  }
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  render() {
    return (
      <div>
      <div id="chartdiv" style={{ width: "100%", height: "450px" }}></div>
      <div id="legend"></div>
      </div>
    );
  }
}

export default ChartModul;

