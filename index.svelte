<script lang="ts">
    import { solveWordle } from './src/index';

    export let currGuess: string;
    export let orangeLetters: string;
    export let notLetters: string;

    function runSolver() {
        solveWordle(currGuess, orangeLetters, notLetters);
    }
</script>


<h1>wordle thing</h1>

<input bind:value={currGuess} placeholder="green letters">
<input bind:value={orangeLetters} placeholder="orange letters">
<input bind:value={notLetters} placeholder="not letters">

<button on:click={runSolver}>Solve</button>
