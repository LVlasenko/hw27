//1. Создаем приложение, в котором существует компонент Diagrams задающий кол-во столбцов-диаграмы(7 вертикальных блоков, высотой 100-300px).
//1.2)Поведение конкретного столбца: Каждый обладает уникальным цветом, именем, значением(задает высоту блоку).

//1.3) Под каждым есть регулятор (input type="range") при перемещении которого - меняется высота соответствующего блока.

//2. Измененные значения сохраняются в локальном хранилище. При перезагрузке страницы - выбранные настройки сохраняются.
//3 *) Создать кнопку, которая отфильтрует столбцы по возрастанию.

//4 *) При перезагрузке страницы отфильтрованный ряд остается.

Vue.component('color-block', {
    props: ['blockColor'],
    data() {
        return {
            blockHeight: 100
        }
    },
    methods: {
        change() {
            this.blockHeight = this.$el.children[1].value;
        },
    },
    watch: {
        blockHeight(newRange) {
          localStorage.blockHeight = newRange;
        }
    },
    template: `
        <div class="container">
            <div class="block" 
                :style="{
                    background: blockColor, 
                    height: blockHeight + 'px'
                }"
            ></div>
            <input type="range" min="100" max="300"
                v-model="blockHeight"  
                v-on:input="change()">
        </div>`
})

var app = new Vue({
    el: '#app',
})