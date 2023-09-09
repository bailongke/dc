<template>
  <div id="app">
    <nav>
      <router-link to="/chu" class="chu">出勤</router-link>
      <router-link to="/yue">月报</router-link>
    </nav>
    <router-view/>
  </div>
</template>
<script>
export default{

}
</script>
<style>

.chu{
  text-align: center;
}
</style>
