<?php include('layouts/header.php'); ?>

<body>

    <header>
        <h1>Os signos</h1>
        <h2>O que dizem as estrelas?</h2>
    </header>

    <nav>
        <ul class="row list-unstyled">
        <li class="col-6 col-sm-4 col-md-3 col-lg-2" id="aries"><a href="#" data-signo="Áries">♈️ Áries</a></li>
        <li class="col-6 col-sm-4 col-md-3 col-lg-2" id="touro"><a href="#" data-signo="Touro">♉️ Touro</a></li>
        <li class="col-6 col-sm-4 col-md-3 col-lg-2" id="gemeos"><a href="#" data-signo="Gêmeos">♊️ Gêmeos</a></li>
        <li class="col-6 col-sm-4 col-md-3 col-lg-2" id="cancer"><a href="#" data-signo="Câncer">♋️ Câncer</a></li>
        <li class="col-6 col-sm-4 col-md-3 col-lg-2" id="leao"><a href="#" data-signo="Leão">♌️ Leão</a></li>
        <li class="col-6 col-sm-4 col-md-3 col-lg-2" id="virgem"><a href="#" data-signo="Virgem">♍️ Virgem</a></li>
        <li class="col-6 col-sm-4 col-md-3 col-lg-2" id="libra"><a href="#" data-signo="Libra">♎️ Libra</a></li>
        <li class="col-6 col-sm-4 col-md-3 col-lg-2" id="escorpiao"><a href="#" data-signo="Escorpião">♏️ Escorpião</a></li>
        <li class="col-6 col-sm-4 col-md-3 col-lg-2" id="sagitario"><a href="#" data-signo="Sagitário">♐️ Sagitário</a></li>
        <li class="col-6 col-sm-4 col-md-3 col-lg-2" id="capricornio"><a href="#" data-signo="Capricórnio">♑️ Capricórnio</a></li>
        <li class="col-6 col-sm-4 col-md-3 col-lg-2" id="aquario"><a href="#" data-signo="Aquário">♒️ Aquário</a></li>
        <li class="col-6 col-sm-4 col-md-3 col-lg-2" id="peixes"><a href="#" data-signo="Peixes">♓️ Peixes</a></li>
        </ul>
    </nav>

    <main>
        <div id="inicial"></div>

        <form id="signo-form" method="POST">
            <div class="form-group mydate">
                <label for="minhadata">Escolha uma data:</label>
                <input type="date" class="form-control date" id="minhadata" name="minhadata">
                <button onclick="hideShow2()" type="submit" class="btn btn-primary">Consultar</button>
            </div>
        </form>

        <div id="final"></div>
    </main>

    <footer>
        <p>As informações deste site são de caráter recreativo, não tendo qualquer comprovação científica.</p>
        <p>By MazinhobigDaddy&reg; - 2025</p>
    </footer>

</body>

</html>