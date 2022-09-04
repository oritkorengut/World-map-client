import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { HttpClient } from '@angular/common/http';

export class clickData{
  clickTime!: any
  coordinates!: {lon:number,lat:number}
}

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
})

export class MapDisplayComponent implements OnInit {
  map!: Map;
  data!:clickData;
  headers=['click time','lon','lag']
  constructor(public http:HttpClient) {
    

  }

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
  }

  showCoordinates(event:any)
  {
    const clickTime=new Date().toLocaleString();
    const pixel=[event.x,event.y];
    const point=this.map.getCoordinateFromPixel(pixel);
    this.data={clickTime:clickTime,coordinates:{lon:point[0],lat:point[1]}};
    console.log(this.data)
  this.http.post(
    "http://localhost:3020/map/addData",this.data
  ).subscribe()


  }
}
