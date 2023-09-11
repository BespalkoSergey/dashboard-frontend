import { Component } from '@angular/core'

@Component({
  selector: 'app-ui-animated-btn',
  standalone: true,
  template: `
    <div class="container-ui-animated-btn">
      <div class="wrap-ui-animated-btn">
        <div class="ui-animated-btn-bg">&nbsp;</div>
        <button class="ui-animated-btn"><ng-content /></button>
      </div>
    </div>
  `,
  styles: [
    `
      .container-ui-animated-btn {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      .wrap-ui-animated-btn {
        width: 100%;
        display: block;
        position: relative;
        z-index: 1;
        border-radius: 25px;
        overflow: hidden;
        margin: 0 auto;
        box-shadow: 0 5px 30px 0 rgba(3, 216, 222, 0.5);
      }

      .ui-animated-btn-bg {
        position: absolute;
        z-index: -1;
        width: 300%;
        height: 100%;
        background: linear-gradient(to right, #00dbde, #fc00ff, #00dbde, #fc00ff);
        top: 0;
        left: -100%;
        transition: all 0.4s;
      }

      .ui-animated-btn {
        margin: 0;
        font-family: Roboto, 'Helvetica Neue', sans-serif;
        cursor: pointer;
        border: none;
        background-color: transparent;
        font-size: 16px;
        color: #fff;
        line-height: 1.2;
        text-transform: uppercase;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
        width: 100%;
        height: 50px;
        font-weight: bold;
        letter-spacing: 2px;
      }

      .wrap-ui-animated-btn:hover .ui-animated-btn-bg {
        left: 0;
      }
    `
  ]
})
export class AnimatedBtnComponent {}
