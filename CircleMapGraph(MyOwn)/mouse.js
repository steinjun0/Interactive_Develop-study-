import { Point } from "./point.js";
export class Mouse {
  constructor() {
    this.mousePos = new Point(
      document.body.clientWidth,
      document.body.clientHeight,
      0,
      0
    );
    this.mousePrevPos = null;
    this.mouseClickPos = new Point(
      document.body.clientWidth,
      document.body.clientHeight,
      0,
      0
    );
    this.isMouseClicked = false;
    this.ctxOrigin = { x: 0, y: 0 };
  }
  onDown(e) {
    console.log("123");
    this.mouseClickPos.setPos(e.clientX, e.clientY);
    this.isMouseClicked = true;
  }

  onMove(ctx, e) {
    if (this.isMouseClicked === true) {
      if (this.mousePrevPos === null) {
        this.mousePrevPos = this.mouseClickPos;
      }
      let dx = e.clientX - this.mousePrevPos.x;
      let dy = e.clientY - this.mousePrevPos.y;
      dx /= ctx.getTransform().a;
      dy /= ctx.getTransform().a;
      this.mousePrevPos.setPos(e.clientX, e.clientY);
      this.ctxOrigin = { x: this.ctxOrigin.x + dx, y: this.ctxOrigin.y + dy };
      ctx.translate(dx, dy);
    }
  }

  onUp() {
    this.isMouseClicked = false;
    this.mousePrevPos = null;
  }
  onWheel(ctx, stageWidth, stageHeight, e) {
    let scale = 1;
    ctx.translate(stageWidth / 2, stageHeight / 2);
    if (e.deltaY < 0) {
      ctx.scale(1.1, 1.1);
    } else {
      ctx.scale(0.9, 0.9);
    }
    ctx.translate(-stageWidth / 2, -stageHeight / 2);
  }
}