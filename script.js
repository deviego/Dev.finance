const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};
const Storage = {
  get() {
    
      return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
  },
  set(transactions) {
    localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))

  },  

}
const Transaction = {
  all:Storage.get(),

  adc(transaction) {
    Transaction.all.push(transaction);

    app.reload();
  },

  remove(index) {
    Transaction.all.splice(index, 1);
    app.reload();
  },
  incomes() {
    //somar entrada
    let income = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income = income += transaction.amount;
      }
    });
    return income;
  },
  expenses() {
    //somar as saidas
    let expense = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense = expense += transaction.amount;
      }
    });
    return expense;
  },
  total() {
    //somar o talal

    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  TransactionContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index

    DOM.TransactionContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
            <td class="description ">${transaction.descripiton}</td>
            <td class="${CSSclass} ">${amount}</td>
            <td class="date ">${transaction.date}</td>
            <td><img onclick="Transaction.remove(${index})" src="assets/minus.svg" alt=""></td>
         `;

    return html;
  },

  updateBalance() {
    document.getElementById("entradas").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );

    document.getElementById("ExpenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );

    document.getElementById("TotalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    DOM.TransactionContainer.innerHTML = "";
  },
};

const Utils = {
  formatAmount(value) {
    value = Number(value) * 100;

    return value;
  },
  formatDate(date) {
    const splitteDate = date.split("-");

    return `${splitteDate[2]}/${splitteDate[1]}/${splitteDate[0]}`;
  },
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";

    value = String(value).replace(/\D/g, "");
    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return signal + value;
  },
};

const form = {
  descripiton: document.querySelector("input#descripition"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),
  getValue() {
    return {
      descripiton: form.descripiton.value,
      amount: form.amount.value,
      date: form.date.value,
    };
  },
  validateField() {
    const { descripiton, amount, date } = form.getValue();

    if (
      descripiton.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === ""
    ) {
      throw new Error("Por Favor, preencha todos os campos ");
    }
  },
  formatValues() {
    let { descripiton, amount, date } = form.getValue();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      descripiton,
      amount,
      date,
    };
  },
  saveTransaction(transaction) {
    Transaction.adc(transaction);
  },
  clearFields() {
    form.descripiton.value = "";
    form.amount.value = "";
    form.date.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      form.validateField();
      const transaction = form.formatValues();
      form.saveTransaction(transaction);
      form.clearFields();
      Modal.close();
    } catch (error) {
      alert(error.message);
    }
  },
};


const app = {
  init() {
    Transaction.all.forEach(DOM.addTransaction)
    
    DOM.updateBalance()

    Storage.set(Transaction.all)
},

  reload() {
    DOM.clearTransactions();
    app.init();
  },
};

app.init();
