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
    padding: 1rem;
    border-radius: 2rem;
    color: var(--primary);
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

</style>