<template>
    <div v-if="isVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <header class="modal-header">
                <slot name="header">{{ headerName }}</slot>
                <button class="btn btn-circle btn-sm btn-error text-base-100" @click="closeModal"><i class="fa-solid fa-xmark"></i></button>
            </header>
            <main class="modal-body">
                <slot name="body">Form goes here...</slot>
            </main>
            <footer class="modal-footer">
                <slot name="footer">
                    <button @click="closeModal">Close</button>
                    <button @click="submit">Submit</button>
                </slot>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false
        },
        headerName: {
            type: String,
            default: 'Modal'
        },
        modalType: {  
            type: String,
            default: 'default' 
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        submit() {
            this.$emit('submit');
        }
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 500px;
    width: 100%;
    position: relative;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-body {
    margin: 20px 0;
}

.modal-footer {
    text-align: right;
}
</style>
