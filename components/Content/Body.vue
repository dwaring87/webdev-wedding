<script>
  import { Image, Recommendations, CollapsibleWell, Card, NuxtLink } from '#components';

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
      
      // Replace the finger lakes recommendations
      let flr = new RegExp('<div(.*)id=[\'"]finger-lakes-recommendations[\'"](.*)>(.*)<\/div>', 'g');
      rendered = rendered.replace(flr, "<Recommendations />");

      // Replace collapsible wells
      let cwsr = new RegExp('<div(.*)data-component=[\'"]CollapsibleWell[\'"](.*)>', 'g');
      rendered = rendered.replace(cwsr, '<CollapsibleWell \$1 \$2>');
      let cwer = new RegExp('<\/div>[\n]?<!-- END CollapsibleWell -->', 'g');
      rendered = rendered.replace(cwer, '</CollapsibleWell>');

      // Return the rendered html as the component template
      // Include any custom components to render
      return h({
        template: `<div>${rendered}</div>`,
        components: {
          Image,
          Recommendations,
          CollapsibleWell,
          Card,
          NuxtLink
        }
      });

    }
  });
</script>