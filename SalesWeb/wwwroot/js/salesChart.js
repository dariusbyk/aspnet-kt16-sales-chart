window.salesChart = {
    draw: function (canvas, labels, amounts) {
        // Дополнительная ширина нужна, чтобы подписи товаров не перекрывались.
        canvas.width = Math.max(900, labels.length * 150 + 100);
        const ctx = canvas.getContext("2d");
        const left = 90;
        const top = 35;
        const height = 280;
        const width = canvas.width - left - 25;
        let max = 1;
        for (let i = 0; i < amounts.length; i++) {
            if (amounts[i] > max) {
                max = amounts[i];
            }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "13px Arial";
        ctx.fillStyle = "#333";
        ctx.fillText("Продажи, руб.", left, 18);
        for (let i = 0; i <= 5; i++) {
            const y = top + height - height * i / 5;
            ctx.strokeStyle = "#ddd";
            ctx.beginPath();
            ctx.moveTo(left, y);
            ctx.lineTo(canvas.width - 25, y);
            ctx.stroke();
            ctx.textAlign = "right";
            ctx.fillText((max * i / 5).toLocaleString("ru-RU", { maximumFractionDigits: 2 }), left - 8, y + 4);
        }
        if (labels.length === 0) {
            ctx.textAlign = "left";
            ctx.fillText("Нет данных для графика", left + 20, top + 40);
            return;
        }
        const step = width / labels.length;
        for (let i = 0; i < labels.length; i++) {
            const barHeight = Math.max(0, amounts[i]) / max * height;
            const x = left + step * i + step * 0.2;
            ctx.fillStyle = "#3578b8";
            ctx.fillRect(x, top + height - barHeight, step * 0.6, barHeight);
            ctx.fillStyle = "#333";
            ctx.textAlign = "center";
            ctx.fillText(amounts[i].toLocaleString("ru-RU"), x + step * 0.3, top + height - barHeight - 7, step - 10);
            ctx.fillText(labels[i], x + step * 0.3, top + height + 25, step - 10);
        }
    },
    download: function (json) {
        const file = new Blob([json], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = "sales.json";
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 1000);
    }
};
