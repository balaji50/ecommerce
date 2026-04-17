import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetproductService {
  constructor(private http: HttpClient) { }

  getdata() {
    return this.http.get<any[]>("https://fakestoreapi.com/products")
  }

  getdata2() {
    return this.http.get<any>('https://dummyjson.com/products/search?q=phone')
  }

  // searchbar function
  private searchbarService = false;
  showSearchService() {
    return this.searchbarService = !this.searchbarService
  }

  searchBarisOpen(): boolean {
    return this.searchbarService;
  }


  // cart function
  private carditemlist: any = []
  private productlist = new BehaviorSubject<any>([]);
  

  getProduct() {
    return this.productlist.asObservable();
  }

  setProduct(product: any) {
    this.carditemlist.push(...product);
    this.productlist.next(product);
  }

  addCart(product: any) {
    this.carditemlist.push(product);
    this.productlist.next(this.carditemlist);
    this.getTotalPrice();
    console.log(this.carditemlist)
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.carditemlist.map((a: any) => {
      grandTotal += a.total
    })
    return grandTotal;
  }

  removeCartItems(product: any) {
    this.carditemlist.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.carditemlist.splice(index, 1)
      }
    })
    this.productlist.next(this.carditemlist);
  }

  removeAllCart() {
    this.carditemlist = [];
    this.productlist.next(this.carditemlist);
  }

  produtDetails(id:any){
   return this.http.get("https://dummyjson.com/products/"+id);
  }

  //get shipping address
  private formDataGet = new BehaviorSubject<any>(null);
  formDatas = this.formDataGet.asObservable();

  setFormData(data:any){
    this.formDataGet.next(data);
  }

}


