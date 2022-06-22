import{_ as n,c as a,o as s,a as t}from"./app.012e36bd.js";const h='{"title":"Integration with IHost","description":"","frontmatter":{},"headers":[{"level":2,"title":".Net 6 Console Integration","slug":"net-6-console-integration"},{"level":2,"title":"\\"Old School Program.Main()\\"","slug":"old-school-program-main"}],"relativePath":"guide/host/index.md","lastUpdated":1655919011685}',e={},o=t(`<h1 id="integration-with-ihost" tabindex="-1">Integration with IHost <a class="header-anchor" href="#integration-with-ihost" aria-hidden="true">#</a></h1><div class="tip custom-block"><p class="custom-block-title">warning</p><p>The functionality to integrate Oakton into .Net Core projects in <em>Oakton.AspNetCore</em> was combined into the main Oakton library for V3.0.</p></div><p>Oakton works well with the <a href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/generic-host?view=aspnetcore-5.0" target="_blank" rel="noopener noreferrer">generic HostBuilder</a> in .Net Core and .Net 5 to extend the command line support of your applications.</p><ul><li><a href="/guide/host/run.html">An improved, default run command</a></li><li><a href="/guide/host/environment.html">A new command for environment check support</a></li><li><a href="/guide/host/extensions.html">Ability to add your own commands running in the context of your application</a></li><li><a href="/guide/host/describe.html">Extensible diagnostic data about your application</a></li></ul><p>To enable the extended command line options in your .Net application bootstrapped by <code>IHostBuilder</code>, first install the <code>Oakton</code> nuget to your project. Then modify the <code>Program.Main()</code> method generated by the typical .Net project templates as shown in some of the examples below:</p><h2 id="net-6-console-integration" tabindex="-1">.Net 6 Console Integration <a class="header-anchor" href="#net-6-console-integration" aria-hidden="true">#</a></h2><p>In .Net 6, you have the option to allow .Net to magically create a <code>Program.Main()</code> entry point over the code in the <code>Program</code> file. Oakton integration with <code>IHost</code> works every so slightly differently than the .Net 5 and before versions, but you can see an example below:</p><p><a id="snippet-sample_bootstrapping_minimal_api"></a></p><div class="language-cs"><pre><code><span class="token keyword">using</span> <span class="token namespace">Oakton</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> builder <span class="token operator">=</span> WebApplication<span class="token punctuation">.</span><span class="token function">CreateBuilder</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// This isn&#39;t required, but it &quot;helps&quot; Oakton to enable</span>
<span class="token comment">// some additional diagnostics for the stateful resource </span>
<span class="token comment">// model</span>
builder<span class="token punctuation">.</span>Host<span class="token punctuation">.</span><span class="token function">ApplyOaktonExtensions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> app <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">MapGet</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token string">&quot;Hello World!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Note the usage of await to force the implied</span>
<span class="token comment">// Program.Main() method to be asynchronous</span>
<span class="token keyword">return</span> <span class="token keyword">await</span> app<span class="token punctuation">.</span><span class="token function">RunOaktonCommands</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/alba/blob/master/src/MinimalApi/Program.cs#L1-L19" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_bootstrapping_minimal_api" title="Start of snippet">anchor</a></sup></p><p>Just note that the <code>return await app.RunOaktonCommands(args);</code> line at the bottom is important because:</p><ol><li>Using <code>return</code> here tells .Net to make the <code>Program.Main()</code> return an exit code that the OS itself needs in order to understand if an execution was successful or not -- and one of the common usages of Oakton is to create validation commands that require this.</li><li>Using <code>await</code> here tells .Net to make <code>Program.Main()</code> return <code>Task&lt;int&gt;</code> and execute asynchronously instead of Oakton having to do evil <code>.GetAwaiter().GetResult()</code> calls behind the scenes.</li><li><code>RunOaktonCommands()</code> makes the .Net program use Oakton as the command line executor to begin with</li></ol><h2 id="old-school-program-main" tabindex="-1">&quot;Old School Program.Main()&quot; <a class="header-anchor" href="#old-school-program-main" aria-hidden="true">#</a></h2><p>Oakton usage for &quot;old school&quot; &lt; .Net 6 applications is very similar:</p><p><a id="snippet-sample_using_run_oakton_commands_3"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Program</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">&gt;</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">CreateHostBuilder</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>
            
            <span class="token comment">// This extension method replaces the calls to</span>
            <span class="token comment">// IWebHost.Build() and Start()</span>
            <span class="token punctuation">.</span><span class="token function">RunOaktonCommands</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">IHostBuilder</span> <span class="token function">CreateHostBuilder</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        Host<span class="token punctuation">.</span><span class="token function">CreateDefaultBuilder</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">ConfigureWebHostDefaults</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">UseStartup</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Startup<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/alba/blob/master/src/MvcApp/Program.cs#L37-L54" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_using_run_oakton_commands_3" title="Start of snippet">anchor</a></sup></p><p>or with <code>IWebHostBuilder</code>:</p><p><a id="snippet-sample_using_run_oakton_commands"></a></p><div class="language-cs"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Program</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">&gt;</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">CreateWebHostBuilder</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>
            
            <span class="token comment">// This extension method replaces the calls to</span>
            <span class="token comment">// IWebHost.Build() and Start()</span>
            <span class="token punctuation">.</span><span class="token function">RunOaktonCommands</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">IWebHostBuilder</span> <span class="token function">CreateWebHostBuilder</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span> <span class="token operator">=&gt;</span>
        WebHost<span class="token punctuation">.</span><span class="token function">CreateDefaultBuilder</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token generic-method"><span class="token function">UseStartup</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Startup<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>
</code></pre></div><p><sup><a href="https://github.com/JasperFx/alba/blob/master/src/MvcApp/Program.cs#L17-L34" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_using_run_oakton_commands" title="Start of snippet">anchor</a></sup></p><p>There are just a couple things to note:</p><ol><li>The return value of the <code>Program.Main()</code> method now needs to be <code>Task&lt;int&gt;</code> rather than <code>void</code>. This is done so that Oakton can return either successful or failure exit codes for usage in diagnostic commands you may want to stop automated builds upon failures.</li><li>You will use the <code>RunOaktonCommands()</code> method to accept the command line arguments and invoke your system rather than manually building and/or starting the <code>IWebHost</code> yourself</li></ol>`,23),p=[o];function c(i,l,u,r,k,d){return s(),a("div",null,p)}var g=n(e,[["render",c]]);export{h as __pageData,g as default};
