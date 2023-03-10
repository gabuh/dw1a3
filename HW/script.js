const Modal = {
        open(){
          //abrir modal
          //adc class active ao modal
          document.querySelector(".modal-overlay").classList.add("active")
        },
        close(){
          //fechar modal
          //remover class active ao modal
          document.querySelector(".modal-overlay").classList.remove("active")
        }
      };
      

const Storage ={
  get(){
    return JSON.parse(localStorage.getItem("gabuh.finances:transactions")) || []
  },
  set(transactions){
    localStorage.setItem("gabuh.finances:transactions",JSON.stringify(transactions))
  }
}
  
      

const Transaction = {
  all: Storage.get()
  ,
  add(transaction){
    Transaction.all.push(transaction);
    DOM.addTransaction(transaction);
    App.reload();
  },
  remove(index){
    Transaction.all.splice(index,1);
    App.reload();
  },
  incomes(){
    let income = 0;
    Transaction.all.forEach(t =>{
            if (t.amount > 0) {
              income += t.amount;
            }
    });
    return income;
  },
  expenses(){
    //somar as saidas
    let expense = 0;
    Transaction.all.forEach(t =>{
            if (t.amount < 0) {
              expense += t.amount;
            }
    });
    return expense;
  },
  total(){
    //entradas-saidas = total
    return Transaction.incomes() + Transaction.expenses();
  }
    
};
      
      
  /*
  pegar transactions do array e colocar no html
  */

  const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
   
    addTransaction(transaction, index){
      const tr = document.createElement('tr');
      tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
      tr.dataset.index = index; 
      DOM.transactionsContainer.appendChild(tr);
    },
    innerHTMLTransaction(transaction, index){
      const CSSclass = transaction.amount >0?'income':'expense' ;
      const amount = Utils.formatCurrency(transaction.amount);
      
      const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" 
          alt="Remover Transa????o" />
        </td>
      `;
      return html;
    },
    updateBalance(){
      document.getElementById('incomeDisplay').innerHTML=Utils.formatCurrency(Transaction.incomes());
      document.getElementById('expenseDisplay').innerHTML=Utils.formatCurrency(Transaction.expenses());
      document.getElementById('totalDisplay').innerHTML=Utils.formatCurrency(Transaction.total());
    },
    clearTransactions(){
      DOM.transactionsContainer.innerHTML="";
    },
    
  };
  
  const Utils = {
    formatDate(date){
      const splittedDate = date.split("-")
      return splittedDate[2]+"/"+splittedDate[1]+"/"+splittedDate[0];
    },
    formatAmount(value){
      value = Number(value) * 100;
      return Math.round(value);
    },
    formatCurrency(value){
      const signal = Number(value) < 0? '-': '';
      value = String(value).replace(/\D/g,"");
      value = Number(value) / 100;
      value = value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
      return signal+value;
    }
  };

//--Tratando formularios
const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),
  getValues(){
    return{
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },
  validateFields(){
    const { description, amount, date } = Form.getValues();
    if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
      throw new Error("Por favor, preencha todos os campos");
    }
  },
  formatValues(){
    let { description, amount, date } = Form.getValues();
   amount = Utils.formatAmount(amount); 
   date = Utils.formatDate(date);
    return{
       description,
       amount,
       date
    }
  },
  saveTransaction(transaction){
    Transaction.add(transaction);
  },
  clearFields(){
    this.description.value = "";
    this.amount.value = "";
    this.date.value = "";
  }
  ,
  submit(event){
    event.preventDefault();
    try {
      this.validateFields();
      const transaction = this.formatValues();
      this.saveTransaction(transaction);
      this.clearFields();
      Modal.close();
    } catch (e) {
        alert(e.message);
    }
    
    
  },
}

  const App = {
    init(){
      Transaction.all.forEach(DOM.addTransaction);
      DOM.updateBalance();
      Storage.set(Transaction.all);
    },
    reload(){
      DOM.clearTransactions();
      App.init();
    },
  };
  
  
  App.init();


