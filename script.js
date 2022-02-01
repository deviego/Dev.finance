const Modal= {
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
        
    },
    close(){
        document
        .querySelector('.modal-overlay')
        .classList.remove('active')
    }
}

const transactions = [
    {
        id: 1,
        descripiton: 'Luz',
        amount: -50000,
        date: '23/01/2022'
    },
    {
        id: 2,
        descripiton: 'Web',
        amount: 500000,
        date: '07/01/2022'
    },
    {
        id: 3,
        descripiton: 'internet',
        amount: -10000,
        date: '07/01/2022' 
    },
]

const Transaction = {
    all:transactions,

    adc(transaction) {
        Transaction.all.push(transaction)

        console.log(transaction.all)
    },

    incomes() {
        //somar entrada
        let income = 0;
        Transaction.all.forEach((transaction) => {
            if(transaction.amount > 0){
                income = income += transaction.amount
            }
        })
       return income
    },
    expenses(){
        //somar as saidas
        let expense = 0;
        Transaction.all.forEach((transaction) => {
            if(transaction.amount < 0) {
                expense = expense += transaction.amount
            }
        })
       return expense
    },
    total(){
        //somar o talal
        
        return Transaction.incomes() - Transaction.expenses()
    }

}

const DOM = {
    TransactionContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.TransactionContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        
        const amount = Utils.formatCurrency(transaction.amount);

        const html = 
        `
            <td class="description ">${transaction.descripiton}</td>
            <td class="${CSSclass} ">${amount}</td>
            <td class="date ">${transaction.date}</td>
            <td><img src="assets/minus.svg" alt=""></td>
         ` 
         
         return html
    },

    updateBalance() {
        document.getElementById('entradas').innerHTML = Utils.formatCurrency(Transaction.incomes()) 

        document.getElementById('ExpenseDisplay').innerHTML = Utils.formatCurrency( Transaction.expenses())

        document.getElementById('TotalDisplay').innerHTML = Utils.formatCurrency(Transaction.total()) 
        }
       
}

 const Utils = {
     formatCurrency(value){
        const signal = Number(value) < 0 ? "-" :""

        value = String(value).replace(/\D/g, "")
        value = Number(value)/ 100
        
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
     }
 }

  Transaction.adc(
    {
    id: 5,
    descripiton : 'Luz',
    amount: 20000,
    date: '23/01/2022'})

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
 })

DOM.updateBalance()


