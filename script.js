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
        
        const amount = Utils.formatCurrency(transaction.amount);

        const html = 
        `
            <td class="description ">${transaction.descripiton}</td>
            <td class="${CSSclass} ">${amount}</td>
            <td class="date ">${transaction.date}</td>
            <td><img src="assets/minus.svg" alt=""></td>
         ` 
         
         return html
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

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
 })
 


