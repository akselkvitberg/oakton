import{_ as s,c as n,o as a,a as o}from"./app.cb90d6e4.js";const d=JSON.parse('{"title":"Using IoC Services","description":"","frontmatter":{},"headers":[{"level":2,"title":"Injecting Services into Commands","slug":"injecting-services-into-commands","link":"#injecting-services-into-commands","children":[]},{"level":2,"title":"Using IoC Command Creators","slug":"using-ioc-command-creators","link":"#using-ioc-command-creators","children":[]}],"relativePath":"guide/host/ioc.md"}'),e={name:"guide/host/ioc.md"},l=o(`<h1 id="using-ioc-services" tabindex="-1">Using IoC Services <a class="header-anchor" href="#using-ioc-services" aria-hidden="true">#</a></h1><p>Very frequently, folks have wanted to either use services from their IoC/DI container for their application, or to have Oakton resolve the command objects from the application&#39;s DI container. New in Oakton 6.2 is that very ability.</p><h2 id="injecting-services-into-commands" tabindex="-1">Injecting Services into Commands <a class="header-anchor" href="#injecting-services-into-commands" aria-hidden="true">#</a></h2><p>If you are using <a href="/oakton/guide/host/integration_with_i_host.html">Oakton&#39;s IHost integration</a>, you can write commands that use IoC services by simply decorating a publicly settable property on your Oakton command classes with the new <code>[InjectService]</code> attribute.</p><p>First though, just to make sure you&#39;re clear about when and when this isn&#39;t applicable, this applies to Oakton used from an <code>IHostBuilder</code> or <code>ApplicationBuilder</code> like so:</p><p><a id="snippet-sample_using_ihost_activation"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Program</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Task</span><span style="color:#89DDFF;">&lt;int&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Main</span><span style="color:#89DDFF;">(string[]</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">args</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">CreateHostBuilder</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">args</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">RunOaktonCommands</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">args</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">static</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">IHostBuilder</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">CreateHostBuilder</span><span style="color:#89DDFF;">(string[]</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">args</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// This is a little old-fashioned, but still valid .NET core code:</span></span>
<span class="line"><span style="color:#A6ACCD;">        Host</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">CreateDefaultBuilder</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">args</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">            </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ConfigureServices</span><span style="color:#89DDFF;">((</span><span style="color:#FFCB6B;">hostContext</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">services</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> services</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">AddHostedService</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Worker</span><span style="color:#89DDFF;">&gt;();</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">});</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/oakton/blob/master/src/WorkerService/Program.cs#L10-L26" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_using_ihost_activation" title="Start of snippet">anchor</a></sup></p><p>Then you can decorate your command types something like this:</p><p><a id="snippet-sample_MyDbCommand"></a></p><div class="language-cs"><button title="Copy Code" class="copy"></button><span class="lang">cs</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyDbCommand</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">OaktonAsyncCommand</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">MyInput</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">InjectService</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyDbContext</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">DbContext</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">get</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">set</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">public</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">override</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Task</span><span style="color:#89DDFF;">&lt;bool&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Execute</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">MyInput</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">input</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// do stuff with DbContext from up above</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#A6ACCD;"> Task</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">FromResult</span><span style="color:#89DDFF;">(</span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">);</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><sup><a href="https://github.com/JasperFx/oakton/blob/master/src/Tests/using_injected_services.cs#L108-L122" title="Snippet source file">snippet source</a> | <a href="#snippet-sample_MyDbCommand" title="Start of snippet">anchor</a></sup></p><p>Just know that when you do this and execute a command that has decorated properties for services, Oakton is:</p><ol><li>Building your system&#39;s <code>IHost</code></li><li>Creating a new <code>IServiceScope</code> from your application&#39;s DI container, or in other words, a scoped container</li><li>Building your command object and setting all the dependencies on your command object by resolving each dependency from the scoped container created in the previous step</li><li>Executing the command as normal</li><li>Disposing the scoped container and the <code>IHost</code>, effectively in a <code>try/finally</code> so that Oakton is always cleaning up after the application</li></ol><h2 id="using-ioc-command-creators" tabindex="-1">Using IoC Command Creators <a class="header-anchor" href="#using-ioc-command-creators" aria-hidden="true">#</a></h2><p>If you would like to just always have Oakton try to use dependency injection in the constructor of the command classes, you also have this option. First, register Oakton through the application&#39;s DI container and run the Oakton commands through the <code>IHost.RunHostedOaktonCommands()</code> extension method as shown below:</p>`,16),p=[l];function t(c,r,i,y,C,D){return a(),n("div",null,p)}const A=s(e,[["render",t]]);export{d as __pageData,A as default};
