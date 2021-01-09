//1. Создаем приложение, в котором существует компонент Diagrams задающий кол-во столбцов-диаграмы(7 вертикальных блоков, высотой 100-300px).
//1.2)Поведение конкретного столбца: Каждый обладает уникальным цветом, именем, значением(задает высоту блоку).

//1.3) Под каждым есть регулятор (input type="range") при перемещении которого - меняется высота соответствующего блока.

//2. Измененные значения сохраняются в локальном хранилище. При перезагрузке страницы - выбранные настройки сохраняются.
//3 *) Создать кнопку, которая отфильтрует столбцы по возрастанию.

//4 *) При перезагрузке страницы отфильтрованный ряд остается.

Vue.component('Diagram', {
    data() {
        return {
            blockList: [],
        }
    },
    methods: {
        sortBlocks() {
            this.blockList.sort((a, b) => a.blockHeight - b.blockHeight);
            this.setLocalStore();
            console.log('sort');
        },
        setLocalStore() {
            localStorage.setItem('blockList', JSON.stringify(this.blockList));//без this не сохраняет изменения, не понимает какой блоклист
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
            </br>
            <button 
                class='sortBtn'
                @click='sortBlocks'
            >Sort</button> 

        </div>

          
    `,
    mounted() {
        const dataFromStore = localStorage.getItem('blockList');
        // if(dataFromStore) {
        //     this.blockList = JSON.parse(dataFromStore);
        // } else {
        //     this.blockList = blockList;
        // }
        this.blockList = (dataFromStore) ? JSON.parse(dataFromStore) : blockList;
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

