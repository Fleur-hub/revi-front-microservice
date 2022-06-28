/* eslint-disable */
/* stylelint-disable */
//Scroll smooth

const link1 = document.querySelector('.go-simulateur');
const section1 = document.querySelector('#simulateur')


link1.addEventListener('click',()=>{
    section1.scrollIntoView({ block: 'end',  behavior: 'smooth' })
})
