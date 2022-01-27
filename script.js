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
        amount: -100,
        date: '07/01/2022' 
    },
]

const transaction = {
    incomes() {
        //somar entrada 
    },
    expenses(){
        //somar as saidas 
    },
    total(){
        //somar o talal 
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
        const amount = Utils.formatCurrency(transaction.amount)
        const html = 
        `
            <td class="description ">${transaction.descripiton}</td>
            <td class="${CSSclass} ">${transaction.amount}</td>
            <td class="date ">${transaction.date}</td>
            <td><img src="assets/minus.svg" alt=""></td>
         ` 
         
         return html
    }
       
}

DOM.addTransaction(transactions[1])

const Utils =  {
    formatCurrency(value) {
        let signal = Number(value) < 0 ? "-" : ""
    }
}

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})
