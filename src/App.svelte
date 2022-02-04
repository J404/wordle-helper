<script lang="ts">
    import { solveWordle } from './index';

    export let currGuess: string;
    export let orangeLetters: string;
    export let notLetters: string;

    function runSolver() {
        let inputs = [ currGuess, orangeLetters, notLetters ];

        inputs.reduce((acc, curr, i) => {
            inputs[i] = curr.toLowerCase().trim();

            if (inputs[i] == '' || inputs[i].length > 5) {
                alert('Invalid input');
            }

            return inputs[i];
        });

        solveWordle(currGuess, orangeLetters, notLetters);
    }
</script>

<main>
    <h1>wordlde thing</h1>

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

    <button on:click={runSolver}>Solve</button>
</main>

<style>
    main {
        font-size: 1.25rem;
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

    button {
        padding: 0.5rem;
        border-radius: 1rem;
        outline: none;
    }

    input {
        padding: 0.5rem;
        border-radius: 1rem;
        transition: border 0.5s ease-in-out;
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
