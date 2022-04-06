<template>
    <div class="components entry footer">
        <div class= "main_">
            <div class="footer_ribbon">Get in touch</div>
            <div class="contact_info">
              <div class="contact">
                <ul>
                    <li><p>CONTACT INFO</p></li>
                    <li>
                        <strong>ADDRESS</strong>
                        <p>7A, Alhaji Kareem Ogungbeye Street, Ikeja, Lagos</p>
                    </li>
                     <li>
                        <strong>PHONE</strong>
                        <p>0902345678</p>
                    </li>
                    <li>
                        <strong>EMAIL</strong>
                        <p>info@nigeriaexport.com</p>
                    </li>
                    <li>
                        <strong>WORKING DAYS/HOURS</strong>
                        <p>Mon-Sun</p>
                    </li>

                    <div>
                        <i class="fab fa-facebook-f"></i>
                        <i class="fab fa-twitter"></i>
                        <i class="fab fa-linkedin-in"></i>
                    </div>
                   
                </ul>
                <div class="section_1">
                <div class="customer_service">
                <ul>
                    <li><p>SUBSCRIBE NEWSLETTER</p></li>
                    <li>
                        <strong></strong>
                        <p>Get all the latest information on Events, Sales and Offers.Sign up for newsletter today.</p>
                    </li>
                </ul>

                <div class="email_input">
                    <input name="email" placeholder="Email Address" type="text"/>
                    <button>Subscribe</button>
                </div>
              </div>
              <div class="line"></div>
              <div class="about_section">
                  <div class="nav">
                      <header>CUSTOMER SERVICE</header>
                      <p>About us</p>
                       <p>Contact us</p>
                       <p>My Account</p>
                  </div>
              </div>
              </div>
              </div>
              <div class="line"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>
<style lang="scss" scoped>
@use 'sass:color' as sasscolor;
@use '@/assets/scss/colors.scss' as color;
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
.components.entry.footer{
    width: 100%;
    height: 400px;
    // position: fixed;
    // bottom:0;
    background: #222529;
    padding: 20px 20px 20px 20px;
    

    .main_{
        .footer_ribbon{
            padding-top: 9px;
        }
        .contact_info{
           
           
          .customer_service,  .contact{
                 display: flex;
                  padding: 0 0 0 100px;
            >ul{
                color:color.$white-1;
                list-style-type:none;

                li{
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 10px;
                    font-size: 13px;
                    p:nth-child(1){
                         font-size: 15px;
                       font-family: 'Poppins', sans-serif;
                    }
                    p{
                        padding: 0;
                        margin: 0;
                        letter-spacing: 0.2px;
                    }

                }
                >div{
                   margin-top: 20px;
                .fab{
                    text-align: center;
                    padding: 10px;
                    border-radius: 50px;
                    border: 1px solid rgba(color.$white-1, 0.1);
                    margin-right: 10px;

                    &:hover{
                        background: color.$greenColor;
                        cursor: pointer;
                    }
                }
              }
            }
           
            >.email_input{
                width: 60%;
                height: 10%;
                display: flex;
                margin-top: 43px;
                margin-left: 86px;
                input{
                    height: 48px;
                    width: 100%;
                    border-radius: 30px 0 0 30px;
                    background:rgba(color.$ash-1, 0.1);
                    color: color.$white-1;
                    border: initial;
                    padding: 0 0 0 10px;
                    outline: none;
                }
                >button{
                    background: color.$greenColor;
                    border: initial;
                    border-radius: 0 30px 30px 0;
                    color: color.$white-1;
                    padding: 0 20px;
                    font-size: 16px;
                    font-weight: 600;
                }
            }
            .section_1{
                .about_section{
                    padding: 20px 0 0 140px;
                    color: color.$white-1;
                    .nav{
                        font-size: 14px;
                        cursor: pointer;    
                        Header{
                            font-size: 15px;
                            font-family: 'Poppins', sans-serif;
                        }
                    }
                }
            }
          }
           .line{
                margin:1px 0 0 136px;
                border: 1px solid rgba(color.$white-1, 0.1);
                margin-top: 40px;
            }
          
        }
    }
}
</style>
