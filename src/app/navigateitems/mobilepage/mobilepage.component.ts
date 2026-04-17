import { Component } from '@angular/core';
import { GetproductService } from 'src/app/product-services/getproduct.service';
import { OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth-Services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mobilepage',
  templateUrl: './mobilepage.component.html',
  styleUrls: ['./mobilepage.component.css']
})
export class MobilepageComponent implements OnInit {
  public productItems: any[] = [];
  public productDisplay: any[] = [];

  constructor(public productservice: GetproductService , public auth:AuthService, public router:Router) { }

  ngOnInit(): void {
    this.getprodut()
  }

  getprodut() {
    this.productservice.getdata2().subscribe({
      next: (data) => {
        this.productItems = data.products
        this.filterMobileProducts();

        this.productDisplay.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price })
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  filterMobileProducts() {
    // Filter products for the "mobiles" category
    this.productDisplay = this.productItems.filter(
      (product) => product.category === "smartphones"
    );
    console.log("Show me Mobile Products:", this.productDisplay);
  }


  isAuth(product:any){
    if(this.auth.isAthenticated()=== true){
    return  this.productservice.addCart(product)
    }
    alert("Please Login")
    this.router.navigate(["users","login"])
  }

  Navigate(){
    this.router.navigate(["navigateitems","product_details"]);
  }
}
