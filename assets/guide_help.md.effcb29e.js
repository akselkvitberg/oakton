import{_ as n,c as s,o as a,a as t}from"./app.148d2893.js";const h='{"title":"Help Text","description":"","frontmatter":{},"relativePath":"guide/help.md","lastUpdated":1655913929300}',p={},e=t(`<h1 id="help-text" tabindex="-1">Help Text <a class="header-anchor" href="#help-text" aria-hidden="true">#</a></h1><p>Oakton comes with its own <code>[Description]</code> attribute that can be applied to fields or properties on the input class to provide help information on usage like this:</p><p><a id="snippet-sample_nameinput"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NameInput</span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Description</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;The name to be printed to the console output&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Description</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;The color of the text. Default is black&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">ConsoleColor</span> Color <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token operator">=</span> ConsoleColor<span class="token punctuation">.</span>Black<span class="token punctuation">;</span>

    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Description</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Optional title preceeding the name&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> TitleFlag <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/alba/blob/master/src/quickstart/Program.cs#L19-L31" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_nameinput" title="Start of snippet">anchor</a></sup></p><p>or on the command class itself:</p><p><a id="snippet-sample_namecommand"></a></p><div class="language-cs"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Description</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;Print somebody&#39;s name&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NameCommand</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">OaktonCommand<span class="token punctuation">&lt;</span>NameInput<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">NameCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// The usage pattern definition here is completely</span>
        <span class="token comment">// optional</span>
        <span class="token function">Usage</span><span class="token punctuation">(</span><span class="token string">&quot;Default Color&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Arguments</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">Usage</span><span class="token punctuation">(</span><span class="token string">&quot;Print name with specified color&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Arguments</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Color<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token class-name">NameInput</span> input<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token class-name"><span class="token keyword">var</span></span> text <span class="token operator">=</span> input<span class="token punctuation">.</span>Name<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">IsNullOrEmpty</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span>TitleFlag<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            text <span class="token operator">=</span> input<span class="token punctuation">.</span>TitleFlag <span class="token operator">+</span> <span class="token string">&quot; &quot;</span> <span class="token operator">+</span> text<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// This is a little helper in Oakton for getting</span>
        <span class="token comment">// cute with colors in the console output</span>
        ConsoleWriter<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>input<span class="token punctuation">.</span>Color<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// Just telling the OS that the command</span>
        <span class="token comment">// finished up okay</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/alba/blob/master/src/quickstart/Program.cs#L33-L63" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_namecommand" title="Start of snippet">anchor</a></sup></p><p>Also note the explanatory text in the <code>Usage()</code> method above in the case of a command that has multiple valid argument patterns.</p><p>To display a list of all the available commands, you can type either:</p><div class="language-"><pre><code>executable help
</code></pre></div><p>or</p><div class="language-"><pre><code>executable ?
</code></pre></div><p>Likewise, to get the usage help for a single command named &quot;clean&quot;, use either <code>executable help clean</code> or <code>executable ? clean</code>.</p>`,15),o=[e];function c(l,u,i,k,r,m){return a(),s("div",null,o)}var g=n(p,[["render",c]]);export{h as __pageData,g as default};
