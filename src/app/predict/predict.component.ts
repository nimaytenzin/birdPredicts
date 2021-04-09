import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { NgxSpinnerService } from "ngx-spinner";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss']
})
export class PredictComponent implements OnInit{
  predictedBird: string;
  prob:string;
  data=[];
  label=[]

  @ViewChild("chart", {static:true}) chart: ChartComponent;
  public chartOptions: any;

  showResults:boolean = false;

  constructor(
    private http: HttpClient ,
    private spinner: NgxSpinnerService
  ) { 
    this.chartOptions = {
      series: [
        {
          name: "Probability",
          data: this.data
        }
      ],
      chart: {
        height: 350,
        with:200,
        type: "bar"
      },
      title: {
        text: "Predictions"
      },
      xaxis: {
        categories: this.label
      }
    };
    
  }

  ngOnInit() {
   
    
  }

  loadFile(event) {
   console.log(event)
   this.data = [];
   this.label =[]
   
    var image:any = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);

    const toDataURL = url => fetch(url)
                                .then(response => {
                                  return response.blob()
                                })
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))


    toDataURL(image.src)
      .then(dataUrl => {
        const base64Encoded = dataUrl.toString().split(",")[1];
        console.log(base64Encoded)

        let image={
          image: base64Encoded
        }

        this.http.post<any>('https://zhichar-pling.ddnsfree.com/bci/predict', image).subscribe(res => {
          console.log(res)

          this.spinner.show();

          setTimeout(() => {
            /** spinner ends after 5 seconds */
            let arr = res.predictions
            this.predictedBird = res.predictions[0].brid_name
            this.prob = res.predictions[0].probability
            console.log(this.predictedBird)
            this.showResults = true
            console.log(arr)

            arr.forEach(element => {
              this.data.push(element.probability);
              this.label.push(element.brid_name)
            });
            this.chartOptions = {
              series: [
                {
                  name: "Probability",
                  data: this.data
                }
              ],
              chart: {
                height: 350,
                type: "bar"
              },
              title: {
                text: "Predictions"
              },
              xaxis: {
                categories: this.label
              }
            };
            this.spinner.hide();    
          }, 4000);         
        })
      })
  };


  
   
}