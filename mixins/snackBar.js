export default {
    data() {
        return {
            snackbar: false,
            timeout: 4000,
            errorText: '',
        }
    },
    methods: {
        showSnackBar(text) {
            this.errorText = text;
            this.snackbar = true;
        }
    }
}