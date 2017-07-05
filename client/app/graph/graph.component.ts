import { Component, OnInit, OnChanges, ViewEncapsulation, Input, ViewChild, ElementRef } from '@angular/core';
declare let d3: any;
declare let nv: any;

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit, OnChanges {

  @Input() data;

  @ViewChild('container') container: ElementRef;

  chart: any;
  chartData: any;

  ngOnInit() {}

  ngOnChanges() {
    if (this.data) {
      if (!this.chart) {
        this.createGraph();
      } else {
        this.updateGraph();
      }
    } else {
      this.chart = null;
      this.chartData = null;
      d3.select(this.container.nativeElement).select('svg').remove();
    }
  }

  createGraph() {
    nv.addGraph(() => {
      this.chart = nv.models.lineChart()
          .x((d) =>  d.date )
          .y((d) =>  d.value )
          .margin({left: 40, top: 20})
          .color(d3.scale.category10().range())
          .useInteractiveGuideline(true);

      this.chart.xAxis
        .tickFormat((d) => d3.time.format('%m/%d/%y')(new Date(d)))
        .showMaxMin(false);

      this.chart.yAxis
        .showMaxMin(false);

      this.chartData = d3.select(this.container.nativeElement).append('svg')
        .attr('width', this.container.nativeElement.offsetWidth)
        .attr('height', 350)
        .datum(this.data);

      this.chartData.transition().duration(500)
        .call(this.chart);

      nv.utils.windowResize(() => { this.chart.update() });

      return this.chart;
    })
  }

  updateGraph() {
    this.chartData.datum(this.data).transition().duration(500).call(this.chart);
    nv.utils.windowResize(() => this.chart.update());
  }

}
