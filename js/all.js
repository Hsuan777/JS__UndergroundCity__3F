/* 取得 DOM */
const input = document.querySelector('.js-displayNum')
const sum = document.querySelector('.js-sum')
const sumTemp = document.querySelector('.js-sumTemp')
const displayOperator = document.querySelector('.js-operator')
const clickBottons = document.querySelectorAll('.btn')

/* 計算機功能函式 */
const cal = function () {
  let vm = this       // 確保指向此物件
  let storageAry = [] // 暫存資料
  let displayAry = [] // 暫存資料實際顯示
  
  // 結果計算
  // 1. 顯示欄為空，則顯示 0
  // 2. 若顯示欄為空且有運算符號
  // 3. 將最後的數字加進去暫存陣列
  this.sum = () => {
    if ( input.value === '' && displayOperator.textContent === '@' ) {
      input.value = 0 
    } else if ( input.value === '' && displayOperator.textContent !== '@' ) {
      return
    } else if (input.value === '非數值' || input.value === '∞' || input.value === '-∞') {
      input.value = ''
      displayOperator.textContent = '@'
      return
    } else {
      storageAry.push( vm.numberStr() )
      input.value = ''
      input.value = vm.otherSum(eval(storageAry.join('')))
      input.value = input.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }
    vm.displayFontSize()
    
    // 運算完清空資料
    storageAry = []
    displayAry = []
    displayOperator.textContent = '='
    sumTemp.value = ''
  }
  // 計算結果判斷
  this.otherSum = (num) => {
    if ( isNaN(num) ) {
      return '非數值'
    } else if ( num === Infinity) {
      return '∞'
    } else if ( num === -Infinity) {
      return '-∞'
    } else {
      return num
    }
  }
  
  // 運算子判斷
  this.arithmetic = ( operator ) => {
    if (input.value === '非數值' || input.value === '∞' || input.value === '-∞') {
      displayOperator.textContent = operator
      input.value = ''
      return
    } else if (input.value !== '') {
      // 運算用符號
      switch (operator) {
        case '+' : storageAry.push( vm.numberStr() , '+' )
          break
        case '−' : storageAry.push( vm.numberStr() , '-' )
          break
        case '×' : storageAry.push( vm.numberStr() , '*' )
          break
        case '÷' : storageAry.push( vm.numberStr() , '/' )
          break
      }
      // 顯示用符號
      displayAry.push( vm.numberStr() , operator )
      sumTemp.value = displayAry.join('')
      displayOperator.textContent = operator
      input.value = ''
    }
    
  }
  
  // 資料清空
  this.clean = () => {
    storageAry = []
    displayAry = []
    displayOperator.textContent = '@'
    sumTemp.value = ''
    input.value = ''
  }
  
  // 欄位顯示
  this.display = ( num ) => {
    // 1. 若有結果再次按下數字鍵，則清空顯示欄，重新輸入新數字
    // 2. 不論運算子為 '@' 或 '+-*/' ，現值為 0 ，則變更為按下的數字
    if (displayOperator.textContent === '='){
      displayOperator.textContent = '@'
      input.value = num.toString()  
    } else if ( input.value === '0' ) {
      if ( num.toString() === '00' || num.toString() !== '.') {
        input.value = num.toString()  
      } else {
        input.value += num.toString() 
      }
    } else {
      // 打散成陣列並移除逗號
      let x =  Array.from(input.value).filter(item=> item != ',')
      // 將新數字加入字串
      x.push(num.toString())
      // 重組字串
      input.value = x.join('')
      // 渲染顯示格式
      input.value = input.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }
    
    vm.displayFontSize()
  }
  
  // 格式化輸入數字為字串與小數點判斷
  this.numberStr = () => {
    if ( Array.from(input.value)[0] === '.' ) {
      let newArray = Array.from(input.value)
      newArray.unshift('0')
      return newArray.join('')
    } else {
      // 打散成陣列並移除逗號
      let x =  Array.from(input.value).filter(item=> item != ',')
      // 重組字串
      input.value = x.join('')
      return x.join('')
    }
  }
  
  // 顯示長度判斷
  this.displayFontSize = () => {
    if ( input.value.length > 10 ) {
      input.classList.remove('custom__fontSize--medium')
      input.classList.add('custom__fontSize--small')
    } else if (input.value.length > 7) {
      input.classList.remove('custom__fontSize--small')
      input.classList.add('custom__fontSize--medium')
    } else {
      input.classList.remove('custom__fontSize--small', 'custom__fontSize--medium')
    }
  }
  
  // 按鈕判斷
  this.clickBtn = ( e ) => {
    switch ( e.toElement.value ) {
      case 'AC': vm.clean()
        break
      case '⌫': 
        if (input.value === '非數值' || input.value === '∞' || input.value === '-∞') {
          input.value = ''
          displayOperator.textContent = '@'
        } else {
          let str = Array.from(input.value).filter(item=> item != ',')
          str.pop()
          input.value = str.join('')
          input.value = input.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          vm.displayFontSize()
        }
        break
      case '=': vm.sum()
        break
      case '+': vm.arithmetic('+')
        break
      case '−': vm.arithmetic('−')
        break
      case '×': vm.arithmetic('×')
        break
      case '÷': vm.arithmetic('÷')
        break
      case '1': vm.display(1)
        break
      case '2': vm.display(2) 
        break
      case '3': vm.display(3)
        break
      case '4': vm.display(4)
        break
      case '5': vm.display(5)
        break
      case '6': vm.display(6)
        break
      case '7': vm.display(7)
        break
      case '8': vm.display(8)
        break
      case '9': vm.display(9)
        break
      case '0': vm.display(0)
        break
      case '00': 
        if ( input.value === '' || input.value === '0' || displayOperator.textContent === '=') {
          return
        } else {
          vm.display('00')
        }
        break
      case '.': vm.display('.')
        break
    }
  }
  
  // 按鍵判斷
  this.keydown = ( e ) => {
    switch ( e.code ){
      case 'Backspace':
        if (input.value === '非數值' || input.value === '∞' || input.value === '-∞') {
          input.value = ''
          displayOperator.textContent = '@'
        } else {
          // 字串轉陣列
          let str = Array.from(input.value).filter(item=> item != ',')
          // pop() 會移除陣列最後一個元素並回傳該值
          // 若直接串接會變成賦予值
          str.pop()
          // join() 將陣列轉字串，若傳入空值則接續
          input.value = str.join('')
          input.value = input.value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          vm.displayFontSize()
        }
        break
      case 'NumpadEnter':
      case 'Enter':
        vm.sum() 
        break
      case 'NumpadAdd': vm.arithmetic('+')
        break
      case 'NumpadSubtract': vm.arithmetic('−')
        break
      case 'NumpadMultiply': vm.arithmetic('×')
        break
      case 'NumpadDivide':vm.arithmetic('÷')
        break
      case 'KeyC': vm.clean()
        break
      case 'NumpadDecimal': 
        if (Array.from(input.value).indexOf('.') === -1) {
          vm.display('.') 
        } 
        break

        /* 數字按鍵區 */
      case 'Numpad0': vm.display(0)
        break
      case 'Numpad1': vm.display(1)
        break
      case 'Numpad2': vm.display(2)
        break
      case 'Numpad3': vm.display(3)
        break
      case 'Numpad4': vm.display(4)
        break
      case 'Numpad5': vm.display(5)
        break
      case 'Numpad6': vm.display(6)
        break
      case 'Numpad7': vm.display(7)
        break
      case 'Numpad8': vm.display(8)
        break
      case 'Numpad9': vm.display(9)
        break
    }
  }
}

const jsCal = new cal()
window.addEventListener( 'keydown', jsCal.keydown )
clickBottons.forEach((item)=>{
  item.addEventListener( 'click', jsCal.clickBtn )
})


