/* УЗЕЛ СВЯЗНОГО СПИСКА
экземпляры класса создаются по данным, которые мы хотим хранить (переменная value, может быть любого примитивного типа),
а также храним информацию о следующем узле (переменная next, должна быть класса LinkedListNode либо null) */
class LinkedListNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}


/* СВЯЗНЫЙ СПИСОК
Для создания связного спика предполагается, что будет создан экземпляр класса LinkedList и в него
с помощью нижеописанных методов будут добавляться/редактироваться значения */
class LinkedList {
    /* для создания списка используем два свойства. Первое - "голова", т.е. начальный элемент списка,
    от которого будет строиться вся цепочка (благодаря свойству next). Она должна иметь класс LinkedListNode;
    Второе - количество элементов в списке. */
    constructor() { // 
        this.head = null; // по умолчанию "головы" нет
        this.numberOfElements = 0; // и, соответственно, элементов тоже нет
    }

    /* метод показывания
    возвращает список в наглядном виде */
    display() {
        // если список пустой, то выдаем ошибку, что показывать нам нечего
        if (this.numberOfElements == 0) {
            console.log('List is empty, nothing to display');
        // во всех остальных случаях выполняем показ
        } else {
            // создаем переменную, содержащую пустой массив
            let linkedListData = [];
            // в конец массива добавляем значение "головы"
            linkedListData.push(this.head.value);
            // запускаем цикл, начиная с элемента с индексом 1 (т.е. второй по порядку) до последнего элемента списка
            for (let index = 1; index < this.numberOfElements; index++) {
                // переменная "выражение"
                /* Так как обращение к элементам списка, начиная с головы, реализуется с помощью многократного
                обращения к свойству next, то нужно вызвать метод .next ровно столько раз, сколько элементов
                списка мы будем проходить
                Иначе говоря: индекс 0 -> свойство .next удаляется -> мы обращаемся к "голове"; индекс 1 -> метод .next
                вызывается один раз -> мы обращаемся ко второму элементу списка, т.е. к элементу с индексом 1, и т.д.
                Ну и в конечном итоге нам нужно значение элемента списка, которое вызывается методом .value */
                let expression = 'this.head' + '.next'.repeat(index) + '.value';
                // вычисляем данное выражение с помощью eval и добавляем результат данной команды в конец списка
                linkedListData.push(eval(expression));
            }
            // выводим массив в консоль
            console.log(linkedListData);
        }
        
    }

    /* метод добавления в начало списка
    мы передаем сюда значение value любого примитвного типа (которое хотим хранить) */
    addToStart(value) {
        /* создаем константу, равную новому узлу
        его значение есть значение, которое мы передали в функцию
        свойство next есть "голова" списка, так как мы создаем узел ДО головы */
        const newNode = new LinkedListNode(value, this.head);
        /* переписываем "голову", так как создавая новый элемент в самом начале списка
        мы даем новый первый элемент, т.е. по своей сути, новую "голову" */
        this.head = newNode;
        this.numberOfElements++; // увеличиваем количество элементов на единицу
    }

    /* метод добавления в конец списка
    мы передаем сюда значение value любого примитвного типа (которое хотим хранить) */
    addToEnd(value) {
        /* создаем константу, равную новому узлу
        его значение есть значение, которое мы передали в функцию
        свойство next есть null, так как после последнего элемента никаких элементов нет */
        const newNode = new LinkedListNode(value, null);
        // если список пустой
        if (this.numberOfElements == 0) {
        // переписываем голову и увеличиваем количество элементов на единицу
            this.head = newNode;
            this.numberOfElements++;
        // если список НЕ пустой
        } else {
            /* переменная выражения по аналогии с вышеуказанной в методе display
            Здесь мы сразу обращаемся к свойству next последнего элемента списка с помощью повторения .next столько раз,
            сколько элементов содержится в данном списке (так как index + 1 есть длина списка).
            На всякий случай, воизбежание конфликтов типов данных, подстраховываемся с помощью parseInt,
            чтобы получить тип number гарантированно.
            Затем мы заменяем свойство next у последнего элемента на новый узел. */
            const expression = 'this.head' + ('.next'.repeat(parseInt(this.numberOfElements))) + ' = newNode';
            // вычисляем вышеописанное выражение и увеличиваем количество элементов на единицу
            eval(expression);
            this.numberOfElements++;
            }
        }

    /* метод удаления узла по значению
    мы передаем сюда значение value, которое хотим найти в узлах и эти узлы удалить */
    remove(value) {
        if (this.numberOfElements == 0) {
            console.log('List is empty, nothing to remove');
        } else if (this.numberOfElements == 1) {
            if (this.head.value === value) {
                this.head = null;
                this.numberOfElements--;
            }
        } else {
            if (this.head.value === value) {
                this.head = this.head.next;
                this.numberOfElements--;
            }
            for (let index = 1; index < this.numberOfElements; index++) {
                let previousNodeExpression = 'this.head' + ('.next'.repeat(index - 1));
                let currentNodeExpression = 'this.head' + ('.next'.repeat(index));
                let followingNodeExpression = 'this.head' + ('.next'.repeat(index + 1));
                let previousNode = eval(previousNodeExpression);
                let currentNode = eval(currentNodeExpression);
                let followingNode = eval(followingNodeExpression);
                if (currentNode.value === value) {
                    previousNode.next = followingNode;
                    this.numberOfElements--;
                }
            }
        }
    }

    /* метод поиска по значению
    мы передаем сюда значение value, которое хотим найти в узлах, и вернуть индекс первого найденного */
    indexOf(value) {
        if (this.numberOfElements == 0) {
            console.log('List is empty, nothing to search');
        } else {
            for (let index = 0; index < this.numberOfElements; index++) {
                let currentNodeExpression = 'this.head' + ('.next'.repeat(index));
                let currentNode = eval(currentNodeExpression);
                if (currentNode.value === value) {
                    return index;
                }
            }
            console.log('Nothing was found');
            return null;
        }
    }

    /* метод добавления посередине списка
    мы передаем сюда значение value, которое хотим добавить, и вписываем индекс, который перезаписываем,
    а весь остальной список сдвигаем */
    addAt(index, value) {
        if (this.numberOfElements == 0) {
            if (index != 0) {
                console.log('List is empty, value can be added only at zero index');
                return;
            } else {
                const newNode = new LinkedListNode(value, null);
                this.head = newNode;
                this.numberOfElements++;
            }
        } else if (this.numberOfElements == 1) {
            if (index === 0) {
                const newNode = new LinkedListNode(value, this.head);
                this.head = newNode;
                this.numberOfElements++;
            } else if (index === 1) {
                const newNode = new LinkedListNode(value, null);
                this.head.next = newNode;
                this.numberOfElements++;
            } else {
                console.log('Wrong index value');
                return;
            }
        } else {
            if ((index) > this.numberOfElements) {
                console.log('Wrong index value');
                return;
            }
            if (index === 0) {
                const newNode = new LinkedListNode(value, this.head);
                this.head = newNode;
                this.numberOfElements++;
            } else {
                let previousNodeExpression = 'this.head' + ('.next'.repeat(index - 1));
                let currentNodeExpression = 'this.head' + ('.next'.repeat(index));
                let previousNode = eval(previousNodeExpression);
                let currentNode = eval(currentNodeExpression);
                const newNode = new LinkedListNode(value, currentNode);
                previousNode.next = newNode;
                this.numberOfElements++;
            }
            }
        }

    /* метод удаления узла по индексу
    мы передаем сюда индекс, который хотим удалить */
    removeAt(index) {
        if (this.numberOfElements == 0) {
            console.log('List is empty, nothing to remove');
        } else if (this.numberOfElements === 1) {
            if (index != 0) {
                console.log('Element at inputted index is not exist');
                return;
            } else {
                this.head = null;
                this.numberOfElements--;
            }
        } else {
            if (index + 1 > this.numberOfElements || index < 0) {
                console.log('Element at inputted index is not exist');
                return;
            } else {
                if (index === 0) {
                    this.head = this.head.next;
                    this.numberOfElements--;
                } else {
                    let previousNodeExpression = 'this.head' + ('.next'.repeat(index - 1));
                    let followingNodeExpression = 'this.head' + ('.next'.repeat(index + 1));
                    let previousNode = eval(previousNodeExpression);
                    let followingNode = eval(followingNodeExpression);
                    previousNode.next = followingNode;
                    this.numberOfElements--;
                }
            }
        }
    }
}

    


/* ПРИМЕР РАБОТЫ СО СВЯЗНЫМ СПИСКОМ */
let linkedListExample = new LinkedList();
linkedListExample.addToEnd(1);
linkedListExample.addToEnd(2);
linkedListExample.addToEnd(3);
linkedListExample.addToEnd(4);
console.log(linkedListExample);
