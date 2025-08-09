// ==UserScript==
// @name         Grok 互動流星雨與星雲背景
// @namespace    http://tampermonkey.net/
// @version      1.2.9
// @description  為Grok網頁添加超自然的流星雨背景，滑鼠點擊生成流星，星雲漸層背景，星星閃爍，只顯示在背景
// @author       Grok
// @match        https://grok.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 創建Canvas畫布
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1'; // 設為背景層
    canvas.style.pointerEvents = 'none'; // 允許滑鼠穿透
    // 添加深色漸層背景
    document.body.style.background = 'linear-gradient(45deg, #0d1117 0%, #161b22 50%, #1f2937 100%)';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('小夜提醒：Canvas初始化失敗！請檢查瀏覽器是否支援Canvas。');
        return;
    }
    console.log('小夜報告：Canvas成功初始化！準備點亮互動流星雨與星雲！🌠');

    let width, height, stars = [], meteors = [];

    // 調整Canvas大小
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        console.log('小夜報告：Canvas大小調整為', width, 'x', height);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 星星物件（背景閃爍）
    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 1 + 0.3; // 調小星星最大大小
            this.alpha = Math.random() * 0.8 + 0.2; // 調整透明度範圍
            this.alphaSpeed = Math.random() * 0.08 + 0.05; // 更明顯的閃爍速度
            this.color = Math.random() > 0.5 ? '#fff' : '#89CFF0'; // 隨機白色或淺藍色
            this.pulsePhase = Math.random() * Math.PI * 2; // 添加脈衝相位
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color.replace('rgb', 'rgba').replace(')', `,${this.alpha})`);
            ctx.fill();
            // 添加星星光暈效果
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2);
            gradient.addColorStop(0, this.color.replace('rgb', 'rgba').replace(')', `,${this.alpha * 0.3})`));
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.fillStyle = gradient;
            ctx.fill();
        }
        update() {
            // 使用正弦波創建更規律的脈衝閃爍效果
            this.pulsePhase += this.alphaSpeed;
            this.alpha = 0.3 + Math.sin(this.pulsePhase) * 0.7; // 更明顯的閃爍範圍
            this.draw();
        }
    }

    // 流星物件
    class Meteor {
        constructor(x = null, y = null) {
            this.x = x !== null ? x : Math.random() * width; // 滑鼠點擊或隨機x
            this.y = y !== null ? y : -10; // 滑鼠點擊或頂部
            this.speed = Math.random() * 6 + 4; // 增加速度
            this.angle = Math.PI / 6 + Math.random() * (Math.PI / 3 - Math.PI / 6); // 30°-60°
            this.alpha = Math.random() * 0.9 + 0.6; // 提高亮度
            this.tailLength = 20; // 拖尾長度
            this.positions = []; // 儲存歷史位置
            console.log('小夜報告：新流星誕生！位置：', this.x, this.y);
        }
        updatePosition() {
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);
        }
        draw() {
            // 繪製流星頭部
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();
            
            // 繪製發光效果
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 4);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
            
            // 繪製拖尾
            if (this.positions.length > 1) {
                ctx.beginPath();
                ctx.moveTo(this.positions[0].x, this.positions[0].y);
                for (let i = 1; i < this.positions.length; i++) {
                    ctx.lineTo(this.positions[i].x, this.positions[i].y);
                }
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.5})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
        update() {
            this.alpha -= 0.008; // 降低淡出速度
            // 更新位置紀錄
            this.positions.unshift({x: this.x, y: this.y});
            if (this.positions.length > this.tailLength) {
                this.positions.pop();
            }
            this.updatePosition();
            this.draw();
        }
    }

    // 滑鼠點擊生成流星（改用document監聽）
    document.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;
        // 確認點擊在Canvas範圍內
        if (x >= 0 && x <= width && y >= 0 && y <= height) {
            meteors.push(new Meteor(x, y));
            console.log('小夜報告：滑鼠點擊生成流星！位置：', x, y);
        } else {
            console.log('小夜提醒：點擊超出Canvas範圍，無法生成流星！位置：', x, y);
        }
    });

    // 初始化星星
    function initStars() {
        stars = [];
        for (let i = 0; i < 100; i++) {
            stars.push(new Star());
        }
        console.log('小夜報告：星星初始化完成，數量：', stars.length);
    }

    // 動畫主迴圈
    function animate() {
        // 繪製星雲背景
        ctx.fillStyle = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
        ctx.fillStyle.addColorStop(0, 'rgba(20, 20, 50, 0.3)');
        ctx.fillStyle.addColorStop(1, 'rgba(0, 0, 20, 0.7)');
        ctx.fillRect(0, 0, width, height);
        
        // 淡化層，保留效果
        ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        ctx.fillRect(0, 0, width, height);
        
        stars.forEach(star => star.update());
        
        if (Math.random() < 0.03) { // 每3-5秒一顆流星
            meteors.push(new Meteor());
            console.log('小夜報告：流星雨來啦！當前流星數：', meteors.length);
        }
        
        meteors = meteors.filter(meteor => meteor.alpha > 0 && meteor.y < height);
        meteors.forEach(meteor => meteor.update());
        
        requestAnimationFrame(animate);
    }

    // 啟動動畫
    initStars();
    animate();
})();