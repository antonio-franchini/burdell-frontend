import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SellerHistory } from '../models/SellerHistory';
import { VehicleAvgDays } from '../models/VehicleAvgDays';
import { PricePerCondition } from '../models/PricePerCondition';
import { PartsReport } from '../models/PartsReport';
import { LoanIncome } from '../models/LoanIncome';
import { SaleDetail } from '../models/SaleDetail';
import { SalepersonPerformanceReport } from '../models/SalepersonPerformanceReport';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {
  reportEnum = {
    SELLER_HISTORY: "Seller History",
    AVERAGE_TIME_IN_HISTORY: "Average Time In Inventory",
    PRICE_PER_CONDITION: "Price Per Condition",
    PARTS_STATISTICS: "Parts Statistics",
    MONTHLY_LOAN_INCOME: "Monthly Loan Income",
    MONTHLY_SALES: "Monthly Sales",
    TOP_PERFORMING_SALESPEOPLE: "Top Performing Salespeople"
  };
  selection = this.reportEnum.SELLER_HISTORY;
  monthlySalesSelection = '';
  monthStringList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  sellerHistoryList: Array<SellerHistory> = [];
  sellerHistoryDisplayedColumns: string[] = [ 'name', 'totalVehiclesSold', 'avgVehiclePrice', 'avgParts', 'avgPartsCost' ];

  vehicleAvgDaysList: Array<VehicleAvgDays> = [];
  vehicleAvgDaysDisplayedColumns: string[] = [ 'type', 'avg' ];

  pricePerConditionList: Array<PricePerCondition> = [];
  pricePerConditionDisplayedColumns: string[] = [ 'type', 'excellent', 'veryGood', 'good', 'fair' ];

  partsReportList: Array<PartsReport> = [];
  partsReportDisplayedColumns: string[] = [ 'vendorName', 'numPartsSold', 'totalDollarAmount' ];

  loanIncomeList: Array<LoanIncome> = [];
  loanIncomeDisplayedColumns: string[] = [ 'year', 'month', 'monthlyPaymentTotal', 'monthlyShare' ];

  saleDetailList: Array<SaleDetail> = [];
  saleDetailDisplayedColumns: string[] = [ 'saleMonth', 'vehiclesSold', 'totalSales', 'netIncome' ];

  salepersonPerformanceReportList: Array<SalepersonPerformanceReport> = [];
  salepersonPerformanceReportDisplayedColumns: string[] = [ 'salepersonFirstName', 'salepersonLastName', 'vehiclesSold', 'totalSales' ];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getSellerHistory();
  }

  jsonHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  loadReport(selection): void {
    this.selection = selection;
    this.salepersonPerformanceReportList = [];
    this.monthlySalesSelection = '';

    switch(selection) {
      case this.reportEnum.SELLER_HISTORY:
        this.getSellerHistory();
        break;
      case this.reportEnum.AVERAGE_TIME_IN_HISTORY:
        this.getAvgDaysReport();
        break;
      case this.reportEnum.PRICE_PER_CONDITION:
        this.getPricePerConditionReport();
        break;
      case this.reportEnum.PARTS_STATISTICS:
        this.getPartsReport();
        break;
      case this.reportEnum.MONTHLY_LOAN_INCOME:
        this.getLoanIncomeReport();
        break;
      case this.reportEnum.MONTHLY_SALES:
        this.getSaleDetailByDateReport();
        break;
    }
  }

  getSellerHistory() {
    this.httpClient
      .get(`${environment.baseUrl}/sellerHistory`, {
        headers: this.jsonHeader()
      })
      .subscribe((sellerHistoryList: Array<SellerHistory>) => {
        this.sellerHistoryList = sellerHistoryList;
      });
  }

  getAvgDaysReport() {
    this.httpClient
      .get(`${environment.baseUrl}/getAvgDaysReport`, {
        headers: this.jsonHeader()
      })
      .subscribe((vehicleAvgDaysList: Array<VehicleAvgDays>) => {
        this.vehicleAvgDaysList = vehicleAvgDaysList;
      });
  }

  getPricePerConditionReport() {
    this.httpClient
      .get(`${environment.baseUrl}/getPricePerConditionReport`, {
        headers: this.jsonHeader()
      })
      .subscribe((pricePerConditionList: Array<PricePerCondition>) => {
        this.pricePerConditionList = pricePerConditionList;
      });
  }

  getPartsReport() {
    this.httpClient
      .get(`${environment.baseUrl}/getPartsReport`, {
        headers: this.jsonHeader()
      })
      .subscribe((partsReportList: Array<PartsReport>) => {
        this.partsReportList = partsReportList;
      });
  }

  getLoanIncomeReport() {
    this.httpClient
      .get(`${environment.baseUrl}/getLoanIncomeReport`, {
        headers: this.jsonHeader()
      })
      .subscribe((loanIncomeList: Array<LoanIncome>) => {
        this.loanIncomeList = loanIncomeList;
      });
  }

  getSaleDetailByDateReport() {
    this.httpClient
      .get(`${environment.baseUrl}/getSaleDetailByDateReport`, {
        headers: this.jsonHeader()
      })
      .subscribe((saleDetailList: Array<SaleDetail>) => {
        this.saleDetailList = saleDetailList;
      });
  }

  /**
   * @param saleMonth - sample input "2019-10"
  */
  getSalepersonPerformanceReport(saleMonth: String) {
    this.httpClient
      .get(`${environment.baseUrl}/getSalepersonPerformanceReport/${saleMonth}`, {
        headers: this.jsonHeader()
      })
      .subscribe((salepersonPerformanceReportList: Array<SalepersonPerformanceReport>) => {
        this.salepersonPerformanceReportList = salepersonPerformanceReportList;
      });
  }

  getMonthStringFromInt(monthInt: number): String {
    return this.monthStringList[monthInt - 1];
  }

  viewDetails(saleDetail: SaleDetail) {
    this.monthlySalesSelection = saleDetail.saleMonth;
    this.getSalepersonPerformanceReport(saleDetail.saleMonth);
  }
}
