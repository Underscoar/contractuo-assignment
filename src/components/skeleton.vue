<template>
    <span class="i-need-a-wrapper-class-for-some-reason">
        &nbsp;
        <span class="skeleton" :style="`min-width: ${calculatedWidth}rem`"></span>
    </span>
</template>

<script>
    export default {
        props: ['minWidth', 'maxWidth'],
        computed: {
            calculatedWidth() {
                return Math.random() * this.maxWidth + this.minWidth
            }
        }
    }
</script>

<style lang="scss" scoped>
    .skeleton {
        display: inline-block;
        position: relative;
        overflow: hidden;
        background-color: #ddd;
        border-radius: 4px;
        position: absolute;
        height: 60%;
        top: 20%;

        &::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
            background-image: linear-gradient(
            90deg,
                rgba(#fff, 0) 0,
                rgba(#fff, 0.2) 20%,
                rgba(#fff, 0.5) 60%,
                rgba(#fff, 0)
            );
            animation: shimmer 3s infinite;
            content: '';
        }

        @keyframes shimmer {
            100% {
                transform: translateX(100%);
            }
        }
    }
</style>