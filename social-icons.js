document.addEventListener("DOMContentLoaded", function () {
    const icons = document.querySelectorAll(".icon");

    icons.forEach(icon => {
        icon.addEventListener("mousedown", function () {
            this.src = this.getAttribute("data-active");
        });

        icon.addEventListener("mouseup", function () {
            this.src = this.getAttribute("data-normal");
        });

        icon.addEventListener("mouseleave", function () {
            this.src = this.getAttribute("data-normal");
        });
    });
});
