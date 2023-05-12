<template>
    <div>
        <!--  粒子字体动效组件 -->
        <canvas id="praticle-text" :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"></canvas>
    </div>
</template>
<script>
/*
*   粒子字体动效组件
*   @props      canvasWidth              {Number}    非必填    画布宽,默认800      
*   @props      canvasHeight             {Number}    非必填    画布高,默认200
*   @props      textColor                {String}    非必填    文字颜色,默认蓝色   
*   @props      textSize                 {Number}    非必填    文字大小，默认50         
*   @props      text                     {String}    必填      文字内容           
*   @props      pointAmount              {Number}    非必填    粒子数量 ,默认5000         
*   @props      isClickAnimation         {Boolean}   非必填    是否需要鼠标点击效果，默认‘是’         
*   @props      isMouseMoveAnimation     {Boolean}   非必填    是否需要鼠标移动效果，默认‘是’
*/
export default {
    name: 'TextParticle',
    props: {
        canvasWidth: {
            type: Number,
            default: 800,
            required: false
        },
        canvasHeight: {
            type: Number,
            default: 200,
            required: false
        },
        textColor: {
            type: String,
            default: '#2257a8',
            required: false
        },
        textSize: {
            type: Number,
            default: 50,
            required: false
        },
        text: {
            type: String,
            default: '这里是文字内容',
            required: true
        },
        pointAmount: {
            type: Number,
            default: 5000,
            required: false
        },
        isClickAnimation: {
            type: Boolean,
            default: true,
            required: false
        },
        isMouseMoveAnimation: {
            type: Boolean,
            default: false,
            required: false
        },
    },
    data() {
        return {
            canvas: null,//画布
            ctx: null,//在画布上绘图的环境
            points: [],
            initialDisplacement: 1000,
            initialVelocity: 5,
            fleeSpeed: 1,
            mouse: {
                x: 0,
                y: 0
            },
            settleSpeed: 8,
            velocityRetenTion: 0.5,
            scatterVelocity: 8,
            fleeDistance: 40,
            size: 3//单个点最大最大

        }
    },
    methods: {
        adjustText() {
            this.ctx.backgroundColor = '#000'
            this.ctx.fillStyle = this.textColor;
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "center";
            this.ctx.font = this.textSize + "px Arial";
            this.ctx.fillText(this.text, this.canvasWidth / 2, this.canvasHeight / 2);
            var textWidth = this.ctx.measureText(this.text).width;
            if (textWidth == 0) {
                return;
            }
            var minX = this.canvas.width / 2 - textWidth / 2;
            var minY = this.canvas.height / 2 - this.textSize / 2;
            var data = this.ctx.getImageData(minX, minY, textWidth, this.textSize).data;
            var isBlank = true;
            for (var i = 0; i < data.length; i++) {
                if (data[i] != 0) {
                    isBlank = false;
                    break;
                }
            }

            if (!isBlank) {
                var count = 0;
                var curr = 0;
                var num = 0;
                var x = 0;
                var y = 0;
                var w = Math.floor(textWidth);
                this.points = [];
                while (count < this.pointAmount) {
                    while (curr == 0) {
                        num = Math.floor(Math.random() * data.length);
                        curr = data[num];
                    }
                    num = Math.floor(num / 4);
                    x = w / 2 - num % w;
                    y = this.textSize / 2 - Math.floor(num / w);
                    this.points.push(this.makePoint(x, y, data[num * 4], data[num * 4 + 1], data[num * 4 + 2], data[num * 4 + 3]));
                    curr = 0;
                    count++;
                }
            }
        },
        makePoint(x, y, r, g, b, a) {
            let _this = this;
            let newPoint = {};
            var angle = Math.random() * 6.28;

            newPoint.size = 2 + Math.random() * (_this.size - 2);
            newPoint.dest_x = x;
            newPoint.dest_y = y;
            newPoint.original_r = r;
            newPoint.original_g = g;
            newPoint.original_a = a;
            newPoint.x = this.canvasWidth / 2 - x + (Math.random() - 0.5) * this.initialDisplacement;
            newPoint.y = this.canvasHeight / 2 - y + (Math.random() - 0.5) * this.initialDisplacement;
            newPoint.velx = this.initialVelocity * Math.cos(angle);
            newPoint.vely = this.initialVelocity * Math.sin(angle);
            newPoint.target_x = this.canvasWidth / 2 - x;
            newPoint.target_y = this.canvasHeight / 2 - y;
            newPoint.r = r;
            newPoint.g = g;
            newPoint.b = b;
            newPoint.a = a;

            newPoint.getX = function () {
                return newPoint.x;
            }

            newPoint.getY = function () {
                return newPoint.y;
            }

            newPoint.resetTarget = function () {
                newPoint.target_x = _this.canvasWidth / 2 - newPoint.dest_x;
                newPoint.target_y = _this.canvasHeight / 2 - newPoint.dest_y;
            }

            newPoint.fleeFrom = function (x, y) {
                newPoint.velx -= ((_this.mouse.x - newPoint.x) * _this.fleeSpeed / 10);
                newPoint.vely -= ((_this.mouse.y - newPoint.y) * _this.fleeSpeed / 10);
            }

            newPoint.settleTo = function (x, y) {
                newPoint.velx += ((newPoint.target_x - newPoint.x) * _this.settleSpeed / 100);
                newPoint.vely += ((newPoint.target_y - newPoint.y) * _this.settleSpeed / 100);
                newPoint.velx -= newPoint.velx * (1 - _this.velocityRetenTion);
                newPoint.vely -= newPoint.vely * (1 - _this.velocityRetenTion);
            }

            newPoint.scatter = function () {
                var unit = newPoint.unitVecToMouse();
                var vel = _this.scatterVelocity * 10 * (0.5 + Math.random() / 2);
                newPoint.velx = -unit.x * vel;
                newPoint.vely = -unit.y * vel;
            }

            newPoint.move = function () {

                if (newPoint.distanceToMouse() <= _this.fleeDistance) {
                    newPoint.fleeFrom(_this.mouse.x, _this.mouse.y);
                }
                else {
                    newPoint.settleTo(_this.target_x, _this.target_y);
                }

                if (newPoint.x + newPoint.velx < 0 || newPoint.x + newPoint.velx >= _this.canvasWidth) {
                    newPoint.velx *= -1;
                }
                if (newPoint.y + newPoint.vely < 0 || newPoint.y + newPoint.vely >= _this.canvasHeight) {
                    newPoint.vely *= -1;
                }

                newPoint.x += newPoint.velx;
                newPoint.y += newPoint.vely;
            }

            newPoint.distanceToTarget = function () {
                return newPoint.distanceTo(newPoint.target_x, newPoint.target_y);
            }

            newPoint.distanceToMouse = function () {
                return newPoint.distanceTo(_this.mouse.x, _this.mouse.y);
            }

            newPoint.distanceTo = function (x, y) {
                return Math.sqrt((x - newPoint.x) * (x - newPoint.x) + (y - newPoint.y) * (y - newPoint.y));
            }

            newPoint.unitVecToTarget = function () {
                return newPoint.unitVecTo(newPoint.target_x, newPoint.target_y);
            }

            newPoint.unitVecToMouse = function () {
                return newPoint.unitVecTo(_this.mouse.x, _this.mouse.y);
            }

            newPoint.unitVecTo = function (x, y) {
                var dx = x - newPoint.x;
                var dy = y - newPoint.y;
                return {
                    x: dx / Math.sqrt(dx * dx + dy * dy),
                    y: dy / Math.sqrt(dx * dx + dy * dy)
                };
            }
            return newPoint;
        },
        animate() {
            this.update();
            this.draw();
        },
        update() {
            var point;
            for (var i = 0; i < this.points.length; i++) {
                point = this.points[i];
                point.move();
            }
        },
        draw() {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

            var point;
            for (var i = 0; i < this.points.length; i++) {
                point = this.points[i];
                this.ctx.fillStyle = "rgba(" + point.r + "," + point.g + "," + point.b + "," + point.a + ")";
                this.ctx.beginPath();
                this.ctx.arc(point.getX(), point.getY(), point.size, 0, 2 * Math.PI);
                this.ctx.fill();
            }

            window.requestAnimationFrame(this.animate);
        },
        //点击
        scatter() {
            let _this = this;
            if (this.isMouseMoveAnimation) {
                window.addEventListener("click", function (event) {
                    _this.mouse.x = event.clientX;
                    _this.mouse.y = event.clientY;
                    for (var i = 0; i < _this.points.length; i++) {
                        _this.points[i].scatter();
                    }
                });
            }
        },
        // 鼠标移动
        flee() {
            let _this = this;
            if (this.isClickAnimation) {
                window.addEventListener("mousemove", function (event) {
                    console.log(event)
                    _this.mouse.x = event.clientX;
                    _this.mouse.y = event.clientY;
                });
            }
        },

        startCanvas() {
            this.canvas = document.getElementById("praticle-text");
            console.log('myCanvs', this.canvas)
            this.ctx = this.canvas.getContext("2d");
            this.canvas.height = this.canvasHeight;
            this.canvas.width = this.canvasWidth;
            this.adjustText();
            window.requestAnimationFrame(this.animate);
            this.scatter();
            this.flee();
        }
    },
    mounted() {
        //this.startCanvas()
    },
}
</script>