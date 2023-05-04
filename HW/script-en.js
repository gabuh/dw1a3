const language= localStorage.getItem('language');
var flagEN = document.URL.endsWith("index-en.html");
var defaultFlag = document.URL.endsWith("index.html");
if(language == 'en' && flag == false){
  window.location.href="index-en.html";
};
if(language == 'en'){
  document.querySelector(".lang.flag.pt").classList.add("active");
}
if(language == 'pt' && defaultFlag == false){
  window.location.href="index.html";
};
if(language == 'pt'){
  document.querySelector(".lang.flag.en").classList.add("active");
};
if( language == null){
  localStorage.setItem('language','pt');
  document.querySelector(".lang.flag.en").classList.add("active");
}

document.querySelector(".lang.flag.en button").onclick = () =>{
  localStorage.setItem('language','en');
  window.location.href="index-en.html";
};
document.querySelector(".lang.flag.pt button").onclick = () =>{
  localStorage.setItem('language','pt');
  window.location.href="index.html";
};


document.querySelector("#theme-button").onclick = () =>{
  document.querySelector(".theme.dash").classList.add("active");
  document.querySelector(".theme.dash.button").classList.add("active");
};
document.querySelector(".theme.dash.button").onclick = () =>{
  document.querySelector(".theme.dash").classList.remove("active");
  document.querySelector(".theme.dash.button").classList.remove("active");
};






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
          alt="Remover Transação" />
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
      value = value.toLocaleString("en-GB",{style:"currency",currency:"USD"});
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
      throw new Error("Please, Fill up all the fields");
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



const darkButton = document.querySelector(".theme-dash.item.dark");
const lightButton = document.querySelector(".theme-dash.item.white");
const greenButton = document.querySelector(".theme-dash.item.green");
const header = document.querySelector('header');
const transaction = document.querySelector('#transaction');
const dataTable = document.querySelector('#data-table');
const tables = document.querySelector('table thead th');
const body = document.querySelector('body');
const theme = localStorage.getItem('theme');
if(theme){
    header.classList.add(theme);
    transaction.classList.add(theme);
    dataTable.classList.add(theme);
    tables.classList.add(theme);
    body.classList.add(theme);
};
darkButton.onclick = () =>{
  header.setAttribute('class','dark');
  transaction.setAttribute('class','dark');
  dataTable.setAttribute('class','dark');
  tables.setAttribute('class','dark');
  body.setAttribute('class','dark');
  localStorage.setItem('theme','dark');
};
lightButton.onclick = () =>{
  header.setAttribute('class','white');
  transaction.setAttribute('class','white');
  dataTable.setAttribute('class','white');
  tables.setAttribute('class','white');
  body.setAttribute('class','white');
  localStorage.setItem('theme','white');
};
greenButton.onclick = () =>{
  header.setAttribute('class','green');
  transaction.setAttribute('class','green');
  dataTable.setAttribute('class','green');
  tables.setAttribute('class','green');
  body.setAttribute('class','green');
  localStorage.setItem('theme','green');
};

const csvExportApp = {
  getCsvData(){
    var csvData = [];
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
      var cols = rows[i].querySelectorAll('td,th');
      var csvrow = [];
      for (var j = 0; j < cols.length-1; j++) {
          csvrow.push(cols[j].innerHTML);
      }
      csvData.push(csvrow.join(","));
    }
    return csvData.join('\n');
  },

  downloadCsvFile(){
     CSVFile = new Blob([this.getCsvData()], { type: "text/csv" });
     var temp_link = document.createElement('a');
     temp_link.download = "GabuhFinanceCSVfile.csv";
     var url = window.URL.createObjectURL(CSVFile);
     temp_link.href = url;
     temp_link.style.display = "none";
     document.body.appendChild(temp_link);
     temp_link.click();
     document.body.removeChild(temp_link);

  }
}

document.querySelector("#modal-button").onclick = () =>{
  Modal.open()
};
document.querySelector("#csv-download-button").onclick = () =>{
  csvExportApp.downloadCsvFile();
};


  



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


