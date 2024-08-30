// Example: Add to Order Button Logic
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Item added to order!');
    });
});
