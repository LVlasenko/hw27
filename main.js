//1. Создаем приложение, в котором существует компонент Diagrams задающий кол-во столбцов-диаграмы(7 вертикальных блоков, высотой 100-300px).
//1.2)Поведение конкретного столбца: Каждый обладает уникальным цветом, именем, значением(задает высоту блоку).

//1.3) Под каждым есть регулятор (input type="range") при перемещении которого - меняется высота соответствующего блока.

//2. Измененные значения сохраняются в локальном хранилище. При перезагрузке страницы - выбранные настройки сохраняются.
//3 *) Создать кнопку, которая отфильтрует столбцы по возрастанию.

//4 *) При перезагрузке страницы отфильтрованный ряд остается.

Vue.component('Diagram', {
    data() {
        return {
            blockList: [
                {
                    id: 1,
                    blockColor: 'rgb(221, 163, 171)',
                    blockHeight: 100
                },
                {
                    id: 2,
                    blockColor: 'rgb(138, 177, 214)',
                    blockHeight: 100
                },
                {
                    id: 3,
                    blockColor: 'rgb(224, 170, 107)',
                    blockHeight: 100
                },
                {
                    id: 4,
                    blockColor: 'rgb(132, 167, 104)',
                    blockHeight: 100
                },
                {
                    id: 5,
                    blockColor: 'rgb(175, 128, 202)',
                    blockHeight: 100
                },
                {
                    id: 6,
                    blockColor: 'rgb(241, 183, 188)',
                    blockHeight: 100
                },
                {
                    id: 7,
                    blockColor: 'rgb(52, 135, 212)',
                    blockHeight: 100
                }
            ]
        }
    },
    methods: {
        setLocalStore() {
            localStorage.setItem('storeData', JSON.stringify(this.blockList));//без this не сохраняет изменения, не понимает какой блоклист
        }
    },
    template: `
        <div class="diagram">
            <blocks 
                v-for='item in blockList'
                :renderBlock='item'
                :key='item.id'
                @sendBlockHeight='setLocalStore'
            />
        </div>
    `,
    mounted() {
        const dataFromStore = localStorage.getItem('storeData');
        console.log(dataFromStore);
        // if(dataFromStore) {
        //     this.blockList = JSON.parse(dataFromStore);
        // } else {
        //     this.blockList = storeData;
        // }
        this.blockList = (dataFromStore) ? JSON.parse(dataFromStore) : storeData;
    }
})

Vue.component('Blocks', {
    props: ['renderBlock'],
    methods: {
        sendBlockHeight() {
            this.$emit('sendBlockHeight')
        }
    },
    template: `
        <div class='color-block'>
            <div
                class='block'
                :style='{ 
                    height: this.renderBlock.blockHeight + "px",
                    backgroundColor: this.renderBlock.blockColor
                }'
            ></div>    
            <input 
                type='range' 
                min='100' 
                max='300'
                v-model='renderBlock.blockHeight'  
                @change='sendBlockHeight'
            >
        </div>
        
    `
});

const app = new Vue({
    el: '#app',
})

