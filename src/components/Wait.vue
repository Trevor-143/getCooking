<template>
    <div class="loader" >
        <Icon icon="eos-icons:bubble-loading" width="35" />
        <h4>Loading</h4>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

</script>

<style scoped>
.loader {
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
    padding: 0.5rem 1.5rem;
    border-radius: 2rem;
    color: var(--primary);
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 99;
    box-shadow: 0px 17px 62px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 0px 17px 62px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 17px 62px 0px rgba(0,0,0,0.75);
}
svg {
    margin-right: 1.5rem;
}
h4 {
    font-weight: 700;
    margin-bottom: 1rem;
}

@media (prefers-color-scheme: dark) {
    .loader {
        background-color: #000000;
        color: var(--primary-lighter);
        box-shadow: 0px 17px 62px 0px rgba(255,255,255,0.75);
        -webkit-box-shadow: 0px 17px 62px 0px rgba(255,255,255,0.75);
        -moz-box-shadow: 0px 17px 62px 0px rgba(255,255,255,0.75);
    }
}

</style>