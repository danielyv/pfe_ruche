import { Component, OnInit } from '@angular/core';
import { RucheService } from '../services/ruche.service'
import { ActivatedRoute } from '@angular/router';
import { Ruche } from '../shared/ruche'
import { Series } from '../shared/series'
import { Point } from '../shared/point'
import { Observable } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {Chart} from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-benchmark',
  templateUrl: './benchmark.component.html',
  styleUrls: ['./benchmark.component.sass']
})
export class BenchmarkComponent implements OnInit {
  public id: String;
  public myhive: Ruche;
  public tempSeries: Series;
  public humiditySeries: Series;
  public fluxSeries: Series;
  public weigthSeries: Series;
  public timeSeries;
  public bar:String="bar";
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  public chartType: string = 'line';


  constructor(private rucheService: RucheService,
    private route: ActivatedRoute,
    private datePipe: DatePipe) {
    route.params.subscribe((param) => {
      this.id = param["id"];
    });
    rucheService.getRuche(this.id).subscribe((el) => {
      this.tempSeries = { "label": "Température", "data": [] }
      this.humiditySeries = { "label": "Humidité", "data": [] }
      this.fluxSeries = { "label": "Flux", "data": [] }
      this.weigthSeries = { "label": "Poid", "data": [] }
      this.timeSeries = { "label": "Date", "data": [] }
      el.records.forEach((e) => {
        this.tempSeries.data.push(e.temperature);
        this.humiditySeries.data.push(e.humiditee);
        this.fluxSeries.data.push(e.flux);
        this.weigthSeries.data.push(e.poid);
        this.timeSeries.data.push(datePipe.transform(e.createdAt,'M/d/yy:H')+"h");
      });
      this.myhive = el;

    })

  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {

  }

}
