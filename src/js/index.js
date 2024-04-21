const container = document.querySelector(".container");
const pesquisa = document.querySelector(".caixa-de-pesquisa button");
const caixaMeteorologica = document.querySelector(".caixa-meteorologica");
const detalhesDoTempo = document.querySelector(".detalhe-do-tempo");
const erro404 = document.querySelector(".not-found");
const esconderCidade = document.querySelector(".esconder-cidade");

// Definição das variáveis para os elementos que serão atualizados com os dados do clima 

const image = document.querySelector('.caixa-meteorologica img');
const temperatura = document.querySelector('.caixa-meteorologica .temperatura');
const descricao = document.querySelector('.caixa-meteorologica .descricao');
const humidade = document.querySelector('.detalhe-do-tempo .humidade span');
const vento = document.querySelector('.detalhe-do-tempo .vento span');

pesquisa.addEventListener('click', () => {

    const APIkey = '18ad8a726f183a3d099a164e5e0ae042';
    const cidade = document.querySelector('.caixa-de-pesquisa input').value;

    if (cidade == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIkey}&lang=pt_br`)
        .then(response => response.json())
        .then(json => {

            if (json.cod == '404') {
                esconderCidade.textContent = cidade;
                container.style.height = "400px";
                caixaMeteorologica.classList.remove('active')
                detalhesDoTempo.classList.remove('active')
                erro404.classList.add('active')
                return;
            }

            if (esconderCidade.textContent == cidade) {
                return;
            } else {
                esconderCidade.textContent = cidade;

                container.style.height = "555px";
                container.classList.add('active')
                caixaMeteorologica.classList.add('active')
                detalhesDoTempo.classList.add('active')
                erro404.classList.remove('active')

                setTimeout(() => {
                    container.classList.remove('active')
                }, 2500);

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'src/images/clear.png';
                        break;

                    case 'Rain':
                        image.src = 'src/images/rain.png';
                        break;

                    case 'Snow':
                        image.src = 'src/images/snow.png';
                        break;

                    case 'Clouds': // Corrigido para 'Clouds'
                        image.src = 'src/images/cloud.png';
                        break;

                    case 'Mist':
                        image.src = 'src/images/mist.png';
                        break;

                    case 'Haze':
                        image.src = 'src/images/mist.png';
                        break;

                    default:
                        image.src = 'src/images/cloud.png';
                }

                temperatura.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
                descricao.innerHTML = `${json.weather[0].description}`;
                humidade.innerHTML = `${json.main.humidity}%`;
                vento.innerHTML = `${json.wind.speed} Km/h`;


                const infoClima = document.querySelector('.info-clima')

                const infoHumidade = document.querySelector('.info-humidade')

                const infoVento = document.querySelector('.info-vento')

                const elCloneInfoClima = infoClima.cloneNode(true);

                const elCloneInfoHumidade = infoHumidade.cloneNode(true);

                const elCloneInfoVento = infoVento.cloneNode(true);

                elCloneInfoClima.id = 'clone-info-clima';
                elCloneInfoClima.classList.add('active-clone')

                elCloneInfoHumidade.id = 'clone-info-humidade';
                elCloneInfoHumidade.classList.add('active-clone')

                elCloneInfoVento.id = 'clone-info-vento';
                elCloneInfoVento.classList.add('active-clone')

                setTimeout(() => {
                    infoClima.insertAdjacentElement('afterend', elCloneInfoClima);

                    infoHumidade.insertAdjacentElement('afterend', elCloneInfoHumidade);

                    infoVento.insertAdjacentElement('afterend', elCloneInfoVento);
                }, 2200);

                const cloneInfoClima = document.querySelectorAll('.info-clima.active-clone');
                const totalCloneInfoClima = cloneInfoClima.length;
                const cloneInfoClimaFirst = cloneInfoClima[0];

                const cloneInfoHumidade = document.querySelectorAll('.info-humidade.active-clone');
                const totalCloneInfoHumidade = cloneInfoHumidade.length;
                const cloneInfoHumidadeFirst = cloneInfoHumidade[0];

                const cloneInfoVento = document.querySelectorAll('.info-vento.active-clone');
                const totalCloneInfoVento = cloneInfoVento.length;
                const cloneInfoVentoFirst = cloneInfoVento[0];


                if (totalCloneInfoClima > 0) {
                    cloneInfoClimaFirst.classList.remove('active-clone');

                    cloneInfoHumidadeFirst.classList.remove('active-clone');

                    cloneInfoVentoFirst.classList.remove('active-clone');

                    setTimeout(() => {
                        cloneInfoClimaFirst.remove();
                        cloneInfoHumidadeFirst.remove();
                        cloneInfoVentoFirst.remove();
                    }, 2200);

                    
                }
            }
        });
});
