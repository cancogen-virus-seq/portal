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

export const i18n_text = {
  // time-tree legend titles
  region_legend: {
    Africa: 'Africa', // English -> lang
    Asia: 'Asia',
    China: 'China',
    Europe: 'Europe',
    'North America': 'North America',
    Oceania: 'Oceania',
    'South America': 'South America',
  },
  sample_legend: 'Sample size (log10)',
  coldate_legend: 'Last collection date',
  diverge_legend: 'Divergence (strict molecular clock)',
  total: 'Total',
  sampled: 'Sampled',
  displayed: 'Displayed',

  // side bar data statistics
  last_update: 'Last update',
  number_genomes: 'Number of genomes',
  number_lineages: 'Number of lineages',
  number_cases: 'Number of cases',
  region: 'Region',
  countries: 'Countries',
  samples: 'Samples',

  // tooltips
  tip_diffs: 'Mean diffs from root',
  tip_residual: 'Deviation from clock',
  tip_cases: 'Number of cases',
  tip_varcount: 'Number of variants',
  tip_coldates: 'Collection dates',
  tip_mutations: 'Mutations',

  vedge_parent: 'Parent',
  vedge_child: 'Child',
  vedge_distance: 'Genomic distance',
  vedge_support: 'Support',
  vedge_coldate: 'Collection date',

  hedge_unique_dates: 'Unique collection dates',
  hedge_coldates: 'Collection dates',

  sample_orig_lab: 'Originating lab',
  sample_subm_lab: 'Submitting lab',
  sample_authors: 'Authors',

  // miscellaneous
  okay: 'Okay!',
  got_it: 'Got it!',
  loading: `Loading. Please Wait...`,
  loading_json: 'Loading JSON data from server (~10s)...',
  country_theaders: ['Region', 'Country', 'Count'],
  sample_theaders: ['Accession', 'Name', 'Date'],
};

// Utility export functions accessible to all scripts

/**
 * Returns true if the string is an accession number
 */
export const isAccn = (string) => {
  const accn_pat = /^EPI_ISL_[0-9]+$/i; // case-insensitive
  return accn_pat.test(string);
};

/**
 * Retruns true if the string is a lineage
 */
export const isLineage = (lineage_to_cid, string) => {
  // const lin_pat = /[A-Z]\.[0-9]+/i;
  // return lin_pat.test(string);
  return lineage_to_cid[string.toUpperCase()] !== undefined;
};

/**
 * Returns a string in an ISO8601 format
 *
 * @param {Date} date: The date to be formated
 */
export const formatDate = (date) => {
  return d3.utcFormat('%Y-%m-%d')(date);
};

/**
 * Returns true if the date is in the correct format (YYYY-MM-DD)
 * @param {String} date
 */
export const isDate = (date) => {
  const date_pat = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  return date_pat.test(date);
};

/**
 * Returns a date in UTC
 *
 * @param {String} date: The date to be converted
 */
export const utcDate = (date) => {
  const dateObj = new Date(date);
  return new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000);
};
