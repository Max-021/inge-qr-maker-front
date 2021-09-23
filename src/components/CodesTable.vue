<template>
    <div class="container">
        <h1>Códigos creados</h1>
        <table>
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Unidad</th>
                    <th>Telefono</th>
                    <th>Contacto</th>
                    <th>Equipo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>asd#1</td>
                    <td>asd#2</td>
                    <td>asd#3</td>
                    <td>asd#4</td>
                    <td>asd#5</td>
                    <td class="acciones">
                        
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
    .container{
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    h1{
        color: hsla(0, 0%, 25%, .9);
    }
    th, tr{
        height: 3rem;
    }
</style>
<script>
export default {
    setup() {
        
    },
}
</script>