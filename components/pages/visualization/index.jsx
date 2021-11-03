/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

/* eslint-disable */

import { useRef, useEffect } from 'react';

import useScriptTag from '../../../global/hooks/useScriptTag';
import PageLayout from '../../PageLayout';
import './lib/jquery-ui.css';
import styles from './VisualizationComponent.module.css';
import { i18n_text } from './utils';

const VisualizationComponent = () => {
  const scriptRef = useRef(null);
  const openHelpSearchRef = useRef(null);
  const helpSearchRef = useRef(null);

  const jQueryLoaded = useScriptTag({
    parentRef: scriptRef,
    src: '//code.jquery.com/jquery-3.6.0.min.js',
  });

  const jQueryUILoaded = useScriptTag({
    dependency: jQueryLoaded,
    parentRef: scriptRef,
    src: '//code.jquery.com/ui/1.13.0/jquery-ui.min.js',
  });

  useEffect(() => {
    // check that jQuery & jQuery-UI are loaded and available
    const hasjQueryUI = !!(jQueryUILoaded && window.jQuery);

    // store ref.current, in case it changes.
    const scriptRefCurrent = scriptRef.current;
    const openHelpSearchRefCurrent = openHelpSearchRef.current;
    const helpSearchRefCurrent = helpSearchRef.current;

    if (hasjQueryUI) {
      // instantiate jQuery & jQuery-UI functions

      // tooltips
      scriptRefCurrent && $(scriptRefCurrent).tooltip({ show: null });

      // dialogs

      // help search dialog
      helpSearchRefCurrent &&
        $(helpSearchRefCurrent).dialog({
          autoOpen: false,
          width: 600,
          buttons: [
            {
              text: i18n_text.got_it,
              click: function () {
                helpSearchRefCurrent && $(helpSearchRefCurrent).dialog('close');
              },
            },
          ],
        });
      openHelpSearchRefCurrent &&
        $(openHelpSearchRefCurrent).on('click', () => {
          helpSearchRefCurrent && $(helpSearchRefCurrent).dialog('open');
        });
    }

    return () => {
      // cleanup
      if (hasjQueryUI) {
        scriptRefCurrent && $(scriptRefCurrent).tooltip('destroy');
        helpSearchRefCurrent && $(helpSearchRefCurrent).dialog('destroy');
        openHelpSearchRefCurrent && $(openHelpSearchRefCurrent).off('click');
      }
    };
  }, [jQueryUILoaded]);

  return (
    <PageLayout subtitle="JQuery Test">
      <div className={styles.covizu} ref={scriptRef}>
        {jQueryUILoaded ? (
          <>
            <div className="tooltip" id="tooltipContainer"></div>

            <div className="app">
              <div className="app-left">
                <div className="bar" style={{ top: '10px', left: '10px', zIndex: 10 }}>
                  <div className="legend-container">
                    <label htmlFor="select-tree-colours">Colour tree by:</label>
                    <select defaultValue="divergence" name="tree-colours" id="select-tree-colours">
                      <option value="Region">Region</option>
                      <option value="No. samples">No. samples</option>
                      <option value="Collection date">Collection date</option>
                      <option value="Divergence">Divergence</option>
                    </select>
                    <div className="legend" id="div-region-legend"></div>
                    <div className="legend" id="svg-sample-legend"></div>
                    <div className="legend" id="svg-coldate-legend"></div>
                    <div className="legend" id="svg-diverge-legend"></div>
                  </div>
                  <div className="search-bar-container">
                    <div id="search-bar">
                      <input
                        type="search"
                        id="search-input"
                        placeholder="e.g., B.1.617 or Manitoba"
                      />
                      <input id="start-date" className="dates" placeholder="Start" />
                      to
                      <input id="end-date" className="dates" placeholder="End" />
                      <button ref={openHelpSearchRef} style={{ cursor: 'help' }}>
                        &#128304;
                      </button>
                    </div>
                    <br />

                    <div id="navigation" style={{ paddingTop: '5px' }}>
                      <button type="button" id="search-button">
                        Search
                      </button>
                      <button type="button" id="clear_button">
                        Clear
                      </button>
                      <button type="button" id="previous_button">
                        Previous
                      </button>
                      <button type="button" id="next_button">
                        Next
                      </button>
                      <div id="search_stats">
                        <span id="curr_hit">0</span>
                        <span>of</span>
                        <span id="tot_hits">0</span>
                        <span>points</span>
                      </div>
                    </div>
                    <div style={{ paddingTop: '5px' }}>
                      {/* <img id="loading" src="img/Loading_icon_cropped.gif" /> */}
                      <span id="loading_text"></span>
                      <span id="error_message"></span>
                    </div>
                  </div>
                </div>

                <div className="tree-beadplot">
                  <div className="leftbox">
                    <div className="floattitle">
                      Time-scaled tree
                      <button
                        className="clicker"
                        title="Download time-scaled tree"
                        // onclick="save_timetree()"
                      >
                        &nbsp;&nbsp;NWK&nbsp;&nbsp;
                      </button>
                      <button
                        className="clicker"
                        title="Download lineage statistics as CSV"
                        // onclick="export_csv();"
                      >
                        &nbsp;&nbsp;CSV&nbsp;&nbsp;
                      </button>
                      <button
                        title="Timetree help"
                        // onclick="$('#help-timetree').dialog('open');"
                        style={{ cursor: 'help' }}
                      >
                        &#128304;
                      </button>
                    </div>
                    <div
                      className="floattitle"
                      id="svg-timetreeaxis"
                      style={{ top: '58px', zIndex: 13 }}
                    ></div>
                    <div className="tree-container">
                      <div
                        className="tree-content"
                        id="svg-timetree"
                        style={{ width: '250px', maxWidth: '250px' }}
                      ></div>
                    </div>
                  </div>

                  <div className="middlebox">
                    <div className="floattitle" id="beadplot-title">
                      <div>Beadplot</div>
                      <button
                        className="clicker"
                        title="Download beadplot as tree"
                        // onclick="save_beadplot();"
                      >
                        &nbsp;&nbsp;NWK&nbsp;&nbsp;
                      </button>
                      <button
                        className="clicker"
                        title="Save beadplot as SVG"
                        // onclick="export_svg();"
                      >
                        &nbsp;&nbsp;SVG&nbsp;&nbsp;
                      </button>
                      <button
                        title="Beadplot help"
                        // onclick="$('#help-beadplot').dialog('open');"
                        style={{ cursor: 'help' }}
                      >
                        &#128304;
                      </button>

                      <div className="edge-cuttoff">
                        <label style={{ verticalAlign: 'middle' }} htmlFor="vedge-slider">
                          Edge cutoff:&nbsp;&nbsp;
                        </label>
                        <div id="left-arrow" className="arrow">
                          <div style={{ transform: 'translateY(-25%)' }} className="larrow">
                            &#8249;
                          </div>
                        </div>
                        <div id="vedge-slider">
                          <div id="custom-handle" className="ui-slider-handle"></div>
                        </div>
                        <div id="right-arrow" className="arrow">
                          <div style={{ transform: 'translateY(-25%)' }} className="rarrow">
                            &#8250;
                          </div>
                        </div>
                      </div>

                      <label className="expand" style={{ verticalAlign: 'middle' }}>
                        &nbsp;&nbsp;Expand:&nbsp;
                      </label>
                      <label className="switch">
                        <input type="checkbox" id="expand-option" />
                        <span className="slider round"></span>
                      </label>
                    </div>
                    <div
                      className="floattitle"
                      id="svg-clusteraxis"
                      style={{ top: '58px', zIndex: 14 }}
                    />
                    <div id="beadplot-hscroll">
                      <div id="inner-hscroll"></div>
                    </div>
                    <div className="beadplot-content" id="svg-cluster" />
                  </div>
                  <div id="beadplot-vscroll">
                    <div id="inner-vscroll" />
                  </div>
                </div>
              </div>

              <div className="app-right">
                <div className="sticky">
                  <div style={{ top: 0, right: 0, zIndex: 10, width: '270px' }}>
                    <a
                      href="https://github.com/PoonLab/covizu/tree/opendata"
                      target="_blank"
                      className="github-corner"
                      aria-label="View source on GitHub"
                    >
                      {/* https://github.com/tholman/github-corners */}
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 250 250"
                        style={{
                          fill: '#151513',
                          color: '#fff',
                          position: 'absolute',
                          top: 0,
                          border: 0,
                          right: 0,
                          zIndex: 21,
                        }}
                        aria-hidden="true"
                      >
                        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                        <path
                          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                          fill="currentColor"
                          style={{ transformOrigin: '130px 106px' }}
                          className="octo-arm"
                        ></path>
                        <path
                          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                          fill="currentColor"
                          className="octo-body"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <div className="rightbox">
                    <div style={{ paddingTop: '10px', cursor: 'help' }}>
                      <h1>
                        <button
                        // onclick="$('#splash').dialog('open');"
                        >
                          <small>
                            <i>open</i>
                          </small>
                          CoVizu
                        </button>
                      </h1>
                    </div>
                    <div
                      style={{
                        fontSize: '8pt',
                      }}
                    >
                      <a href="index.html">en</a>
                      <a href="index-es.html">es</a>
                      <a href="index-fr.html">fr</a>
                      <a href="index-zh.html">zh</a>
                    </div>
                    <div style={{ paddingTop: '10px', paddingRight: '6px' }}>
                      <h3>
                        Near real-time visualization of SARS-CoV-2 (hCoV-19) genomic variation
                      </h3>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9em' }} id="div-last-update"></div>
                      <div style={{ fontSize: '0.9em' }} id="div-number-genomes"></div>
                      <div style={{ fontSize: '0.9em' }} id="div-number-lineages"></div>
                    </div>

                    <div id="tabs">
                      <ul>
                        <li>
                          <a href="#tabs-1">Countries</a>
                        </li>
                        <li>
                          <a href="#tabs-2">Samples</a>
                        </li>
                      </ul>
                      <div id="tabs-1">
                        <div className="breaker" id="barplot"></div>
                        <div
                          style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '200px' }}
                          id="country-table"
                        ></div>
                      </div>
                      <div id="tabs-2">
                        <div
                          style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '200px' }}
                          id="seq-table"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id="splash" title="Welcome">
              <p>
                <b>CoVizu</b> is an{' '}
                <a href="https://github.com/PoonLab/CoVizu" target="_blank">
                  open source project
                </a>
                endeavouring to visualize the global diversity of SARS-CoV-2 genomes.
              </p>
              <p>
                This web page provides two interactive visualizations of these data. On the left, it
                displays a{' '}
                <a href="https://en.wikipedia.org/wiki/Phylogenetic_tree" target="_blank">
                  phylogenetic tree
                </a>{' '}
                summarizing the evolutionary relationships among different
                <a href="https://cov-lineages.org" target="_blank">
                  SARS-CoV-2 lineages
                </a>{' '}
                (groupings of viruses with similar genomes, useful for linking outbreaks in
                different places;{' '}
                <a href="https://www.nature.com/articles/s41564-020-0770-5" target="_blank">
                  Rambaut
                  <i>et al.</i> 2020
                </a>
                ). You can navigate between different lineages by clicking on their respective
                boxes.
              </p>
              <p>
                Selecting a lineage displays a "beadplot" visualization in the centre of the page.
                Each horizontal line represents one or more samples of SARS-CoV-2 that share the
                same genome sequence. Beads along the line represent the dates that this variant was
                sampled.
              </p>
              <p>
                For more help, click on the
                <a
                  style={{ textDecoration: 'none' }}
                  href="https://en.wikipedia.org/wiki/Shoshinsha_mark"
                  target="_blank"
                >
                  &#128304;
                </a>
                icons.
              </p>
            </div>

            <div id="help-timetree" title="Help: Time-scaled tree interface">
              <p>
                A phylogenetic tree is a model of how different populations are related by common
                ancestors. The tree displayed here (generated by{' '}
                <a href="https://github.com/neherlab/treetime">TreeTime</a> v0.8.0) summarizes the
                common ancestry of different
                <a href="https://cov-lineages.org" target="_blank">
                  SARS-CoV-2 lineages
                </a>
                , which are pre-defined groupings of viruses based on genome similarity.
              </p>
              <p>
                A time scale is drawn above the tree marked with
                <a href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank">
                  dates
                </a>
                . The earliest ancestor (root) is drawn on the left, and the most recent observed
                descendants are on the right. We estimate the dates of common ancestors by comparing
                the sampled genomes and assuming a{' '}
                <a
                  href="http://virological.org/t/phylodynamic-analysis-176-genomes-6-mar-2020/356"
                  target="_blank"
                >
                  constant rate
                </a>{' '}
                of evolution.
              </p>
              <p>
                For each lineage, we draw a rectangle to summarize the range of sample collection
                dates, and colour it according to the geographic region it was sampled most often.
                To explore the samples within a lineage, click on the label (<i>e.g.,</i> "B.4") or
                the rectangle to retrieve the associated beadplot.
              </p>
            </div>

            <div id="help-beadplot" title="Help: Beadplot interface">
              <p>
                We use beadplots to visualize the different variants of SARS-CoV-2 within a
                <a href="https://cov-lineages.org" target="_blank">
                  lineage
                </a>
                , where and when they have been sampled, and how they are related to each other.
                Every object in the beadplot has additional info in a tooltip (which you view by
                hovering over that object with your mouse pointer).
              </p>
              <p>
                Each horizontal line segment represents a variant &ndash; viruses with
                <span
                  className="hint"
                  title="It's a bit more complicated.  Many genomes are identical in sequence, but many more have missing information - parts of the genome that have not been sequenced.  Since we can't be 100% certain two genomes with missing parts are identical, we randomly re-sample genomes 100 times (non-parametric bootstrap) and evaluate how often they are separated in our analysis."
                >
                  identical
                </span>
                genomes. We draw beads along a line to indicate when that variant was sampled. If
                there are no beads on the line and it is grey, then it is an unsampled variant: two
                or more sampled variants descend from an ancestral variant that has not been
                directly observed.
              </p>
              <p>
                The area of the bead is scaled in proportion to the number of times the variant was
                sampled that day. This is important for rapid or intensively-sampled epidemics,{' '}
                <i>e.g.,</i>
                lineage D.2 in Australia. Beads are{' '}
                <span
                  className="hint"
                  title="Refer to the barplot in the Countries tab in the right panel for a colour legend."
                >
                  coloured
                </span>
                with respect to the most common geographic region of the samples.
              </p>
              <p>
                We draw vertical line segments to connects variants to their
                <span
                  className="hint"
                  title="The direction of ancestor-descendant relationships is, in effect, determined by degree size.  This is a crude estimate, so be cautious about interpreting the directionality of these relationships."
                >
                  common ancestors
                </span>
                . These relationships are estimated by the{' '}
                <a href="https://en.wikipedia.org/wiki/Neighbor_joining">neighbor-joining method</a>{' '}
                using
                <a href="https://birc.au.dk/software/rapidnj/">RapidNJ</a>. Tooltips for each edge
                report the number of genetic differences (mutations) between ancestor and descendant
                as the "genomic distance". Since it's difficult to reconstruct exactly when these
                mutations occurred, we simply map each line to when the first sample was collected.
              </p>
            </div>

            <div id="help-search" title="Help: Search interface" ref={helpSearchRef}>
              <p>
                Since there is an overwhelming number of sampled infections that we are trying to
                visualize here, we have built a basic search interface that you can interact with
                using the inputs at the top of this web page.
              </p>
              <p>
                You can use the text box to find a specific sample by GISAID accession number. If
                you start to enter an accession number, the text box will display a number of
                possibilities (autocompletion). You can also search samples by substring
                (case-sensitive). For example, searching for "Madaga" (hit enter to submit) will
                jump to the first lineage that contains a sample from Madagascar.
              </p>
              <p>
                Use the "Previous" and "Next" buttons to iterate through your search results, and
                the "Clear" button to reset the search interface.
              </p>
            </div>
          </>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </PageLayout>
  );
};

export default VisualizationComponent;
