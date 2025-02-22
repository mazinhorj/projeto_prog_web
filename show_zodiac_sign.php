<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Receber a data do formulário
    $dataEscolhida = isset($_POST['minhadata']) ? $_POST['minhadata'] : null;

    if ($dataEscolhida) {
        $dataFormatada = date("d/m", strtotime($dataEscolhida));
    }

    // Converter a data para o formato adequado (dia/mês)
    $dataFormatada = date("d/m", strtotime($dataEscolhida));

    // Carregar o arquivo XML
    $xml = simplexml_load_file('signos.xml');

    $signoEncontrado = '';

    // Função para verificar se a data está dentro do intervalo
    function isDateInRange($date, $start, $end)
    {
        $currentDate = DateTime::createFromFormat('d/m', $date);
        $startDate = DateTime::createFromFormat('d/m', $start);
        $endDate = DateTime::createFromFormat('d/m', $end);

        // Verifica se a data atual está entre as datas de início e fim
        return $currentDate >= $startDate && $currentDate <= $endDate;
    }

    // Iterar pelos signos no XML
    foreach ($xml->signo as $signo) {
        $dataInicio = (string)$signo->dataInicio;
        $dataFim = (string)$signo->dataFim;

        if (isDateInRange($dataFormatada, $dataInicio, $dataFim)) {
            $signoEncontrado = (string)$signo->signoNome;
            $signoDesc = (string)$signo->descricao;
            break;
        }
    }



    // Exibir o resultado
    if ($signoEncontrado) {
        echo "<h2>$signoEncontrado</h2>
        <p>De $dataInicio à $dataFim</p>
        <p>$signoDesc</p>";
        echo '<a href="index.php" class="btn btn-primary">Escolher outra data</a>';
    } else {
        echo "<p>Não foi possível determinar seu signo.</p>";
        echo '<a href="index.php" class="btn btn-primary">Tentar Novamente</a>';
    }
} else {
    echo "<h1>Por favor, envie uma data.</h1>";
    echo '<a href="index.php" class="btn btn-primary">Tentar Novamente</a>';
}
