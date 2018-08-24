<template>
    <div>
        <h1>编辑器</h1>
        <div id="editor"></div>
    </div>
</template>
<script>
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ClassicEditor from '~/plugins/editor'
export default {
  data () {
    return {
        ClassicEditor:null
    }
  },
  mounted(){
          ClassicEditor.create( document.querySelector( '#editor' ) ,{
                toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
                heading: {
                    options: [
                        { modelElement: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { modelElement: 'heading1', viewElement: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { modelElement: 'heading2', viewElement: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                    ]
                }
          })
          .then( editor => {
              window.editor = editor;
          } )
          .catch( err => {
              console.error( err.stack );
          } );

  },
  created(){
  }
}
</script>
<style lang="less">

</style>


