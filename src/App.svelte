<script lang="ts">
    import { solveWordle } from './index';

    export let currGuess: string;
    export let orangeLetters: string;
    export let notLetters: string;

    export let result1: string, result2: string;

    export let ranOnce = false;
    export let invalidInput = false;

    async function runSolver() {
        ranOnce = true;
        invalidInput = false;

        let inputs = [ currGuess, orangeLetters, notLetters ];

        inputs.reduce((acc, curr, i) => {
            inputs[i] = curr.toLowerCase().trim();

            if (inputs[i] == '' || inputs[i].length > 5 && i != 2) {
                invalidInput = true;
            }

            return inputs[i];
        });

        ({ result1, result2 } = await solveWordle(currGuess, orangeLetters, notLetters));
        console.log(result1, result2);
    }
</script>

<main>
    <h1>wordle helper</h1>

    <div id="inputs">
        <div id="green-letters">
            <span class="green-in">green letters</span>
            <input class="green-in" bind:value={currGuess} placeholder="ex. *o**s">
        </div>
        <div id="orange-letters">
            <span class="orange-in">orange letters</span>
            <input class="orange-in" bind:value={orangeLetters} placeholder="ex. t**s*">
        </div>
        <div id="not-letters">
            <span class="grey-in">greyed letters</span>
            <input class="grey-in" bind:value={notLetters} 
            on:keyup={key => {
                if (key.key == 'Enter') {
                    runSolver();
                }
            }} placeholder="ex. ghvab">
        </div>
    </div>

    <button on:click={runSolver}>solve</button>

    <div id="results">
        {#if invalidInput}
            <p class="error">Invalid input: try again</p>
        {/if}

        {#if result1}
            <p>Most letter combinations: {result1}</p>
            {#if result2}
                <p>Most commonly used word: {result2}</p>
            {/if}
        {:else if ranOnce}
            <p class="warning">
                No results: make sure the input is entered correctly.<br>
                Make sure there are no repeats in the green letters category and the grey letters category.<br>
                If you're sure that it's entered correctly, then kindly stop breaking my thing.
            </p>
        {/if}
    </div>
</main>

<style>
    main {
        font-size: 1.25rem;
    }

    .error, .warning {
        color: white;
        padding: 0.5rem;
        width: fit-content;
        border-radius: 0.5rem;
        border: none;
    }

    .error {
        background-color: rgb(197, 14, 14);
    }

    .warning {
        background-color: rgb(216, 160, 8);
    }

    div#inputs {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 0.5rem;
    }

    div#inputs > div {
        padding-bottom: 0.25rem;
    }

    div#green-letters {
        color: #538d4e;
    }

    div#orange-letters {
        color: #b59f3b;
    }

    div#not-letters {
        color: #3a3a3c;
    }

    div#results {
        width: 50vw;
    }

    @media only screen and (max-width: 600px) {
        div#results {
            width: 95vw;
        }
    }

    button {
        padding: 0.5rem;
        padding-left: 0.75rem;
        padding-right: 0.72rem;
        border-radius: 1rem;
        outline: none;
        border: 2px solid black;
        background-color: white;
        color: black;

        transition: border-width 0.25s ease-in-out;
    }

    button:active, button:hover {
        border-width: 3px;
    }

    input {
        padding: 0.5rem;
        border-radius: 1rem;
        transition: border 0.25s ease-in-out;
        outline: none;
    }

    input.green-in {
        border: 2px solid #538d4e;
        color: #538d4e;
    }

    input.green-in:focus {
        border: 3px solid #538d4e;
    }

    input.orange-in {
        border: 2px solid #b59f3b;
        color: #b59f3b;
    }

    input.orange-in:focus {
        border: 3px solid #b59f3b;
    }

    input.grey-in {
        border: 2px solid #3a3a3c;
        color: #3a3a3c;
    }

    input.grey-in:focus {
        border: 3px solid #3a3a3c;
    }
</style>
