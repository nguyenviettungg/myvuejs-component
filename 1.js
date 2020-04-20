// var product = 'Socks';
Vue.component("product", {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },    
    template: `
    <div class="product">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="product-image">
            <img v-bind:src="image" v-bind:alt="altText" />
            <!-- v-blin:  dùng để dàng buộc với dữ liệu trong js có thể dùng viết tắt bằng dấu : phía trước -->
          </div>
        </div>
        <div class="col-sm-6">
          <div class="product-info">
            <h1>{{title}}</h1>
            <h1 :disabled="!onSale">{{string}}</h1>
            <!-- <p v-if="instock">In Stock</p> -->
            <!-- <p v-show="instock">In Stock</p> -->
            <!-- v-show: sử dụng để show or hide element -->
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">
              Almost sold out!
            </p>
            <p v-else :class="{textMute: !instock}">Out of Stock</p>
            <!--<p>User is premium : {{ premium }}</p>-->
            <p>Shipping : {{ shipping }}</p>
            <ul>
              <li v-for="detail in details">{{detail}}</li>
            </ul>
            <div
              v-for="(variant,index) in variants"
              :key="variant.variantId"
              class="color-box"
              :style="{backgroundColor: variant.variantColor}"
              @mouseover="updateProduct(index)"
            ></div>
            <!-- <button v-on:click="cart++" class="btn btn-primary" >Add to cart</button> -->
            <button
              v-on:click="addToCart"
              :disabled="!instock"
              :class="{ disabledButton: !instock}"
              class="btn btn-secondery"
            >
              Add cart
            </button>
            <div class="cart">
              <p>Cart({{cart}})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    `,
    data() {
        return {
            brand: "Vue Mastery",
            product: "Socks",
            selectedVariant: 0,
            altText: "A pair of socks",
            inventory: 0,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
              {
                variantId: 1001,
                variantColor: "green",
                variantImage:
                  "https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578366170160_4.png?alt=media&token=e0829829-627b-44e1-9d96-fa22eaca1ac9",
                variantQuantity: 10,
              },
              {
                variantId: 1002,
                variantColor: "blue",
                variantImage:
                  "https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1578366211820_6.png?alt=media&token=8d11c5b3-5741-414c-a7ad-6d830f2f4229",
                variantQuantity: 0,
              },
            ],
            cart: 0,
            onSale: false,
          }
    },
    methods: {
        addToCart() {
          this.cart++;
        },
        updateProduct(index) {
          this.selectedVariant = index;
          console.log(index);
        },
    },
    computed: {
        title() {
          return this.brand + " " + this.product;
        },
        image() {
          return this.variants[this.selectedVariant].variantImage;
        },
        instock() {
          return this.variants[this.selectedVariant].variantQuantity;
        },
        string() {
          return this.brand + " " + this.product;
        },
        shipping() {
            if(this.premium) {
                return "Free"
            }
            return 2.99
        }
    },
});

var app = new Vue({
    el: "#app",
    data: {
        premium: true
    }
  
});
