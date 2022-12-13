<script>
  import { Image, NuxtLink } from '#components';

  export default defineNuxtComponent({
    props: {
      html: {
        type: String,
        required: true
      }
    },

    render() {

      // Replace image tags with DirctusImg tags
      let rendered = this.html;
      let re = new RegExp('<img(.*)src=[\'"]([^ ]+)[\'"](.*)\/>', 'g');
      rendered = rendered.replace(re, "<Image\$1d-src='\$2' \$3 />");

      // Return the rendered html as the component template
      // Include any custom components to render
      return h({
        template: `<div>${rendered}</div>`,
        components: {
          Image,
          NuxtLink
        }
      });

    }
  });
</script>