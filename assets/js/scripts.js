document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar o XML
    function loadXMLDoc() {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "signos.xml", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                displaySigno(xhr.responseXML);
            }
        };
        xhr.send();
    }

    // Função para exibir o signo baseado na data atual
    function displaySigno(xml) {
        const today = new Date();
        const month = today.getMonth() + 1; // Janeiro é 0
        const day = today.getDate();
        const dateString = `${day}/${month}`;

        const signos = xml.getElementsByTagName("signo");
        let signoEncontrado = '';
        let signoDesc = '';
        let signoDataIni = '';
        let signoDataFim = '';

        for (let i = 0; i < signos.length; i++) {
            const dataInicio = signos[i].getElementsByTagName("dataInicio")[0].textContent;
            const dataFim = signos[i].getElementsByTagName("dataFim")[0].textContent;

            if (isDateInRange(dateString, dataInicio, dataFim)) {
                signoEncontrado = signos[i].getElementsByTagName("signoNome")[0].textContent;
                signoDataIni = signos[i].getElementsByTagName("dataInicio")[0].textContent;
                signoDataFim = signos[i].getElementsByTagName("dataFim")[0].textContent;
                signoDesc = signos[i].getElementsByTagName("descricao")[0].textContent;
                break;
            }
        }

        const mainContainer = document.querySelector("#inicial");
        if (signoEncontrado) {
            mainContainer.innerHTML = `<h3>O signo de hoje é:<br /> ${signoEncontrado}</h3>
            <p>De ${signoDataIni} à ${signoDataFim}.</p>
            <p>${signoDesc}</p>

            <button type="button" onclick="hideShow()" class="btn btn-primary">Ver meu signo</button>`;
        } else {
            mainContainer.innerHTML = "<h3>Não foi possível determinar seu signo.</h3>";
        }
    }

    // Função para verificar se a data está dentro do intervalo
    function isDateInRange(date, start, end) {
        const d = new Date();
        const [day, month] = date.split('/').map(Number);
        const currentDate = new Date(d.getFullYear(), month - 1, day);
        
        const [startDay, startMonth] = start.split('/').map(Number);
        const startDate = new Date(d.getFullYear(), startMonth - 1, startDay);
        
        const [endDay, endMonth] = end.split('/').map(Number);
        const endDate = new Date(d.getFullYear(), endMonth - 1, endDay);

        return currentDate >= startDate && currentDate <= endDate;
    }

    loadXMLDoc(); // Carregar o XML ao iniciar
});


document.getElementById("signo-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const formData = new FormData(this); // Coleta os dados do formulário

    fetch("show_zodiac_sign.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text()) // Recebe a resposta como texto
    .then(data => {
        document.getElementById("final").innerHTML = data; // Atualiza a div com o resultado
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById("final").innerHTML = "<h1>Ocorreu um erro ao consultar o signo.</h1>";
    });
});


function loadSignoInfo(signo) {
    fetch('signos.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o XML');
            }
            return response.text();
        })
        .then(str => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "text/xml");
            const signos = xmlDoc.getElementsByTagName("signo");
            let informacaoSigno = '';
            let informacaoSignoIni = '';
            let informacaoSignoFim = '';

            for (let i = 0; i < signos.length; i++) {
                const nome = signos[i].getElementsByTagName("signoNome")[0].textContent;
                if (nome === signo) {
                    informacaoSignoIni = signos[i].getElementsByTagName("dataInicio")[0].textContent;
                    informacaoSignoFim = signos[i].getElementsByTagName("dataFim")[0].textContent;
                    informacaoSigno = signos[i].getElementsByTagName("descricao")[0].textContent;
                    break;
                }
            }

            if (informacaoSigno) {
                document.getElementById('final').innerHTML = `
                    <h1>${signo}:</h1>
                    <p>De ${informacaoSignoIni} à ${informacaoSignoFim}</p>
                    <p>${informacaoSigno}</p>
                    <a href="index.php" class="btn btn-primary">Voltar</a>
                `;
            } else {
                document.getElementById('final').innerHTML = `
                    <h1>Informações não encontradas para ${signo}.</h1>
                    <a href="#" class="btn btn-primary" onclick="document.getElementById('final').innerHTML = '';">Voltar</a>
                `;
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('final').innerHTML = "<h1>Ocorreu um erro ao carregar as informações do signo.</h1>";
        });
}

function hideShow3(){
    var x = document.getElementById("inicial");
    var y = document.getElementById("final");
    var z = document.getElementById("signo-form");
        if (x.style.display === "none") {
            x.style.display = "none";
        } else {
            x.style.display = "none";
        }
        if (y.style.display === "none") {
            y.style.display = "flex";
        } else {
            y.style.display = "flex";
        }
        if (z.style.display === "flex") {
            z.style.display = "none";
        } else {
            z.style.display = "none";
        
        }
    }

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do link

        const signo = this.getAttribute('data-signo'); // Obtém o signo do atributo data
        loadSignoInfo(signo); // Chama a função para carregar as informações
        hideShow3();
    });
});